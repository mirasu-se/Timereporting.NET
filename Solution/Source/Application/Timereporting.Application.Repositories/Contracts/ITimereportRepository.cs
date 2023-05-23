using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Repositories.Contracts
{
    public interface ITimereportRepository
    {
        Task<int> CreateTimereportAsync(TimereportDto timereport);
        Task DeleteTimereportAsync(TimereportDto timereport);
        Task<IEnumerable<TimereportDto>> GetAllTimereportsAsync();
        Task<TimereportDto> GetTimereportByIdAsync(Guid id);
        Task UpdateTimereportAsync(TimereportDto timereport);
    }
}