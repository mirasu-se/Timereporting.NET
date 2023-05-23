using System.Text;
using Timereporting.Infrastructure.Configuration.Database.Connection.Contracts;

namespace Timereporting.Infrastructure.Configuration.Database.Connection
{
    public class ConnectionStringBuilder : IConnectionStringBuilder
    {
        private readonly Dictionary<string, string> _properties;

        public ConnectionStringBuilder()
        {
            _properties = new Dictionary<string, string>();
        }

        public void AddProperty(string key, string value)
        {
            _properties[key] = value;
        }

        public string Build()
        {
            var connectionStringBuilder = new StringBuilder();

            foreach (var property in _properties)
            {
                connectionStringBuilder.Append($"{property.Key}={property.Value};");
            }

            return connectionStringBuilder.ToString();
        }
    }
}
