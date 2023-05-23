using System.Data;

namespace Timereporting.Infrastructure.Configuration.Database.Models
{
    public class CommonDbConnection
    {
        public IDbConnection Connection { get; set; }

        public CommonDbConnection(IDbConnection connection)
        {
            Connection = connection;
        }
    }
}
