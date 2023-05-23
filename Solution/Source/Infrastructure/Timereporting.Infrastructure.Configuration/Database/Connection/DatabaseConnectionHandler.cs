using Timereporting.Infrastructure.Configuration.Database.Connection.Contracts;
using Timereporting.Infrastructure.Configuration.Database.Models.Database;

namespace Timereporting.Infrastructure.Configuration.Database.Connection
{
    public class DatabaseConnectionHandler : IDatabaseConnectionHandler
    {
        private readonly IConnectionStringBuilder _connectionStringBuilder;

        public DatabaseConnectionHandler(IConnectionStringBuilder connectionStringBuilder)
        {
            _connectionStringBuilder = connectionStringBuilder;
        }

        public string BuildMicrosoftConnectionString(MicrosoftDbConnectionModel connectionModel)
        {
            _connectionStringBuilder.AddProperty("Server", connectionModel.Server);
            _connectionStringBuilder.AddProperty("Database", connectionModel.Database);
            _connectionStringBuilder.AddProperty("User ID", connectionModel.UserId);
            _connectionStringBuilder.AddProperty("Password", connectionModel.Password);

            return _connectionStringBuilder.Build();
        }

        public string BuildPostgresConnectionString(PostgreSqlDbConnectionModel connectionModel)
        {
            _connectionStringBuilder.AddProperty("Host", connectionModel.Server);
            _connectionStringBuilder.AddProperty("Port", connectionModel.Port.ToString());
            _connectionStringBuilder.AddProperty("Database", connectionModel.Database);
            _connectionStringBuilder.AddProperty("User ID", connectionModel.UserId);
            _connectionStringBuilder.AddProperty("Password", connectionModel.Password);

            return _connectionStringBuilder.Build();
        }

        public string BuildMySqlConnectionString(MySqlDbConnectionModel connectionModel)
        {
            _connectionStringBuilder.AddProperty("Server", connectionModel.Server);
            _connectionStringBuilder.AddProperty("Port", connectionModel.Port.ToString());
            _connectionStringBuilder.AddProperty("Database", connectionModel.Database);
            _connectionStringBuilder.AddProperty("User ID", connectionModel.UserId);
            _connectionStringBuilder.AddProperty("Password", connectionModel.Password);

            return _connectionStringBuilder.Build();
        }
    }
}