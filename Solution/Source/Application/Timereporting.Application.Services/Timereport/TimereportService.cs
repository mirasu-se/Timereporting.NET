using Timereporting.Application.Repositories.Contracts;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Services.Timereport
{
    public class TimereportService : ITimereportService
    {
        private readonly ITimereportRepository _timereportRepository;

        public TimereportService(ITimereportRepository timereportRepository)
        {
            _timereportRepository = timereportRepository;
        }

        public async Task<IEnumerable<TimereportDto>> GetAllTimereportsAsync()
        {
            return await _timereportRepository.GetAllTimereportsAsync();
        }

        public async Task<TimereportDto> GetTimereportByIdAsync(Guid id)
        {
            return await _timereportRepository.GetTimereportByIdAsync(id);
        }

        public async Task<int> CreateTimereportAsync(TimereportDto timereport)
        {
            timereport.TimeCreated = DateTime.UtcNow;
            return await _timereportRepository.CreateTimereportAsync(timereport);
        }

        public async Task UpdateTimereportAsync(TimereportDto timereport)
        {
            await _timereportRepository.UpdateTimereportAsync(timereport);
        }

        public async Task DeleteTimereportAsync(TimereportDto timereport)
        {
            timereport.IsDeleted = true;
            timereport.TimeDeleted = DateTime.UtcNow;
            timereport.UserDeleted = Guid.NewGuid();

            await _timereportRepository.DeleteTimereportAsync(timereport);
        }
    }
}