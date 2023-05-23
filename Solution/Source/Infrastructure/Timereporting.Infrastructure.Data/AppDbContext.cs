using Microsoft.EntityFrameworkCore;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Infrastructure.Data.Entities.Timereport;
using Timereporting.Infrastructure.Data.Entities.Workplace;

namespace Timereporting.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AppUserEntity> Users { get; set; }
        public DbSet<ReportTypeEntity> ReportTypes { get; set; }
        public DbSet<TimereportEntity> Timereports { get; set; }
        public DbSet<WorkplaceEntity> Workplaces { get; set; }
    }
}