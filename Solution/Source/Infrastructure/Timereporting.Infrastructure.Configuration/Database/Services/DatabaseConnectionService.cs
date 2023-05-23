using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Npgsql;
using System.Data;
using Timereporting.Infrastructure.Configuration.Database.Connection.Contracts;
using Timereporting.Infrastructure.Configuration.Database.Models;
using Timereporting.Infrastructure.Configuration.Database.Models.Contracts;
using Timereporting.Infrastructure.Configuration.Database.Services.Contracts;
using Timereporting.Infrastructure.Configuration.Database.ValueObjects.Enums;

namespace Timereporting.Infrastructure.Configuration.Database.Services
{
    public class DatabaseConnectionService : IDatabaseConnectionService
    {
        private readonly ICommonDbConnection _commonDbConnection;
        private readonly IDatabaseConnectionHandler _databaseConnectionHandler;
        private readonly IConfiguration _configuration;

        public DatabaseConnectionService(
            ICommonDbConnection commonDbConnection,
            IDatabaseConnectionHandler databaseConnectionHandler,
            IConfiguration configuration)
        {
            _commonDbConnection = commonDbConnection;
            _databaseConnectionHandler = databaseConnectionHandler;
            _configuration = configuration;
        }

        public string GetConnectionString(DatabaseType databaseType)
        {
            var databaseConfiguration = JsonConvert.DeserializeObject<DatabaseConfiguration>(_configuration.GetSection("DatabaseConfiguration").Value);

            return databaseType switch
            {
                DatabaseType.MsSql =>
                    _databaseConnectionHandler.BuildMicrosoftConnectionString(databaseConfiguration.MsSqlDbConnectionModel),
                DatabaseType.PostgreSql =>
                    _databaseConnectionHandler.BuildPostgresConnectionString(databaseConfiguration.PostgreSqlDbConnectionModel),
                DatabaseType.MySql =>
                    _databaseConnectionHandler.BuildMySqlConnectionString(databaseConfiguration.MySqlDbConnectionModel),
                _ => throw new NotSupportedException($"Unsupported database type: {databaseType}"),
            };
        }

        public IDbConnection CreateConnection()
        {
            IDbConnection connection;
            string databaseType = _commonDbConnection.GetType().Name;

            switch (databaseType)
            {
                case nameof(MicrosoftDbConnectionModel):
                    var msSqlConnection = _commonDbConnection as MicrosoftDbConnectionModel;
                    connection = new SqlConnection(_databaseConnectionHandler.BuildMicrosoftConnectionString(msSqlConnection));
                    break;
                case nameof(PostgreSqlDbConnectionModel):
                    var postgreSqlConnection = _commonDbConnection as PostgreSqlDbConnectionModel;
                    connection = new NpgsqlConnection(_databaseConnectionHandler.BuildPostgresConnectionString(postgreSqlConnection));
                    break;
                case nameof(MySqlDbConnectionModel):
                    var mySqlConnection = _commonDbConnection as MySqlDbConnectionModel;
                    connection = new MySqlConnection(_databaseConnectionHandler.BuildMySqlConnectionString(mySqlConnection));
                    break;
                default:
                    throw new NotSupportedException($"Unsupported database type: {databaseType}");
            }

            return connection;
        }

        public void OpenConnection(IDbConnection connection)
        {
            if (connection.State == ConnectionState.Closed) connection.Open();
        }

        public async Task OpenConnectionAsync(IDbConnection connection)
        {
            if (connection.State == ConnectionState.Closed)
            {
                switch (connection)
                {
                    case SqlConnection sqlConnection:
                        await sqlConnection.OpenAsync();
                        break;
                    case NpgsqlConnection npgsqlConnection:
                        await npgsqlConnection.OpenAsync();
                        break;
                    case MySqlConnection mySqlConnection:
                        await mySqlConnection.OpenAsync();
                        break;
                    default:
                        throw new NotSupportedException($"Unsupported connection type: {connection.GetType().Name}");
                }
            }
        }
    }
}
