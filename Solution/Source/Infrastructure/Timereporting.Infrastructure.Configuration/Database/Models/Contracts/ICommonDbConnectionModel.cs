namespace Timereporting.Infrastructure.Configuration.Database.Models.Contracts
{
    public interface ICommonDbConnection
    {
        ICommonDbConnection Connection { get; set; }
    }
}