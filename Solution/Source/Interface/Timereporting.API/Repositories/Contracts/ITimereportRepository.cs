using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories.Contracts
{
    public interface ITimereportRepository
    {
        Task<int> CreateTimereportAsync(Timereport timereport);
        Task DeleteTimereportAsync(Timereport timereport);
        Task<IEnumerable<Timereport>> GetAllTimereportsAsync();
        Task<Timereport> GetTimereportByIdAsync(int id);
        Task UpdateTimereportAsync(Timereport timereport);
    }
}