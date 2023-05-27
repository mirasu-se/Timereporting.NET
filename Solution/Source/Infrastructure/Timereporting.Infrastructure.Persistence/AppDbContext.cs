using Microsoft.EntityFrameworkCore;
using Timereporting.Infrastructure.Persistence.Entities;

namespace Timereporting.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TimereportEntity> Timereports { get; set; }
        public DbSet<WorkplaceEntity> Workplaces { get; set; }
    }
}