﻿using Timereporting.Infrastructure.Configuration.Database.Models;

namespace Timereporting.Infrastructure.Configuration.Database.Connection.Contracts
{
    public interface IDatabaseConnectionHandler
    {
        string BuildMicrosoftConnectionString(MicrosoftDbConnectionModel connectionModel);
        string BuildMySqlConnectionString(MySqlDbConnectionModel connectionModel);
        string BuildPostgresConnectionString(PostgreSqlDbConnectionModel connectionModel);
    }
}