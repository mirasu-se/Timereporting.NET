using Timereporting.Infrastructure.Persistence.Entities;

namespace Timereporting.Infrastructure.Repositories
{
    public interface ITimereportRepository
    {
        Task CreateTimereportAsync(TimereportEntity timereport);
        Task DeleteTimereportAsync(TimereportEntity timereport);
        Task<IEnumerable<TimereportEntity>> GetAllTimereportsAsync();
        Task<TimereportEntity> GetTimereportByIdAsync(int id);
        Task<IEnumerable<TimereportEntity>> GetTimereportsAsync(int workplaceId, DateTime? fromDate, DateTime? toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesAsync(int workplaceId, DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateAsync(int workplaceId, DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateAsync(int workplaceId, DateTime fromDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate);
        Task<IEnumerable<TimereportEntity>> GetTimereportsByWorkplaceAsync(int workplaceId);
        Task<int> SaveChangesAsync();
        Task UpdateTimereportAsync(TimereportEntity timereport);
    }
}