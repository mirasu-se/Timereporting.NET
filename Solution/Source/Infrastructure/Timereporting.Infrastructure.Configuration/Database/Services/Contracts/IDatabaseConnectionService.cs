using System.Data;

namespace Timereporting.Infrastructure.Configuration.Database.Services.Contracts
{
    public interface IDatabaseConnectionService
    {
        IDbConnection CreateConnection();
        void OpenConnection(IDbConnection connection);
        Task OpenConnectionAsync(IDbConnection connection);
    }
}