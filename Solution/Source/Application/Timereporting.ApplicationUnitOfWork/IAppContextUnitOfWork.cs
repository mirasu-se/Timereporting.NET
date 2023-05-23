using Microsoft.EntityFrameworkCore;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Infrastructure.Data.Entities.Timereport;
using Timereporting.Infrastructure.Data.Entities.Workplace;

namespace Timereporting.ApplicationUnitOfWork
{
    public interface IAppContextUnitOfWork
    {
        DbSet<AppUserEntity> Users { get; }
        DbSet<ReportTypeEntity> ReportTypes { get; }
        DbSet<TimereportEntity> Timereports { get; }
        DbSet<WorkplaceEntity> Workplaces { get; }
        Task<int> SaveChangesAsync();
    }
}
