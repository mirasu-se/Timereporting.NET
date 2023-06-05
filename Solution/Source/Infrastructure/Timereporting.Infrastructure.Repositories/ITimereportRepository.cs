using Timereporting.Infrastructure.Persistence.Entities;

namespace Timereporting.Infrastructure.Repositories
{
    public interface ITimereportRepository
    {
        Task CreateTimereportAsync(TimereportEntity timereport);
        Task DeleteTimereportAsync(TimereportEntity timereport);
        Task<IEnumerable<TimereportEntity>> GetAllTimereportsAsync();
        Task<TimereportEntity> GetTimereportByIdAsync(Guid workplaceId);
        Task<IEnumerable<TimereportEntity>> GetTimereportsAsync(Guid? workplaceId, DateTime? fromDate, DateTime? toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesAsync(Guid workplaceId, DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateAsync(Guid workplaceId, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateAsync(Guid workplaceId, DateTime fromDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByWorkplaceAsync(Guid workplaceId);
        Task<int> SaveChangesAsync();
        Task UpdateTimereportAsync(TimereportEntity timereport);
    }
}