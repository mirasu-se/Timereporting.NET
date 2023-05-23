using Microsoft.EntityFrameworkCore;
using Timereporting.Api.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories
{
    public class TimereportRepository : ITimereportRepository
    {
        private readonly AppDbContext _dbContext;

        public TimereportRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Timereport>> GetAllTimereportsAsync()
        {
            return await _dbContext.Timereports.ToListAsync();
        }

        public async Task<Timereport> GetTimereportByIdAsync(int id)
        {
            return await _dbContext.Timereports.FindAsync(id);
        }

        public async Task<int> CreateTimereportAsync(Timereport timereport)
        {
            _dbContext.Timereports.Add(timereport);
            await _dbContext.SaveChangesAsync();
            return timereport.Id;
        }

        public async Task UpdateTimereportAsync(Timereport timereport)
        {
            _dbContext.Timereports.Update(timereport);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteTimereportAsync(Timereport timereport)
        {
            _dbContext.Timereports.Remove(timereport);
            await _dbContext.SaveChangesAsync();
        }
    }
}
