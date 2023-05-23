namespace Timereporting.Infrastructure.Configuration.Database.Connection.Contracts
{
    public interface IConnectionStringBuilder
    {
        void AddProperty(string key, string value);
        string Build();
    }
}