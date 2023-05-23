using Newtonsoft.Json;
using Timereporting.Infrastructure.Configuration.Database.Models.Database;

namespace Timereporting.Infrastructure.Configuration.Database.Models
{
    public class DatabaseConfiguration
    {
        public MicrosoftDbConnectionModel MsSqlDbConnectionModel { get; set; } = new MicrosoftDbConnectionModel();
        public PostgreSqlDbConnectionModel PostgreSqlDbConnectionModel { get; set; } = new PostgreSqlDbConnectionModel();
        public MySqlDbConnectionModel MySqlDbConnectionModel { get; set; } = new MySqlDbConnectionModel();
    }
}
