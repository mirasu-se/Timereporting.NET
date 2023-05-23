using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

                string connectionString = configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseMySQL(connectionString, b => b.MigrationsAssembly("Timereporting.Infrastructure.Data"));
            }
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<ReportType> ReportTypes { get; set; }
        public DbSet<Timereport> Timereports { get; set; }
        public DbSet<Workplace> Workplaces { get; set; }
    }
}