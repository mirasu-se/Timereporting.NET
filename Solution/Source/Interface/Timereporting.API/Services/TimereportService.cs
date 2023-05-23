using Timereporting.Api.Repositories.Contracts;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services
{
    public class TimereportService : ITimereportService
    {
        private readonly ITimereportRepository _timereportRepository;

        public TimereportService(ITimereportRepository timereportRepository)
        {
            _timereportRepository = timereportRepository;
        }

        public async Task<IEnumerable<Timereport>> GetAllTimereportsAsync()
        {
            return await _timereportRepository.GetAllTimereportsAsync();
        }

        public async Task<Timereport> GetTimereportByIdAsync(int id)
        {
            return await _timereportRepository.GetTimereportByIdAsync(id);
        }

        public async Task<int> CreateTimereportAsync(Timereport timereport)
        {
            timereport.TimeCreated = DateTime.UtcNow;
            return await _timereportRepository.CreateTimereportAsync(timereport);
        }

        public async Task UpdateTimereportAsync(Timereport timereport)
        {
            await _timereportRepository.UpdateTimereportAsync(timereport);
        }

        public async Task DeleteTimereportAsync(Timereport timereport)
        {
            timereport.IsDeleted = true;
            timereport.TimeDeleted = DateTime.UtcNow;
            timereport.UserDeleted = Guid.NewGuid();

            await _timereportRepository.DeleteTimereportAsync(timereport);
        }
    }
}