using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Persistence
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var dbContextBuilder = new DbContextOptionsBuilder<AppDbContext>();

            string connectionString = configuration.GetConnectionString("DefaultConnection");

            dbContextBuilder.UseMySQL(connectionString);

            return new AppDbContext(dbContextBuilder.Options);
        }
    }
}