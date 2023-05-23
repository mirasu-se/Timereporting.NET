using Microsoft.EntityFrameworkCore;
using Timereporting.Api.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories
{
    public class WorkplaceRepository : IWorkplaceRepository
    {
        private readonly AppDbContext _dbContext;

        public WorkplaceRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Workplace>> GetAllWorkplacesAsync()
        {
            return await _dbContext.Workplaces.ToListAsync();
        }

        public async Task<Workplace> GetWorkplaceByIdAsync(int id)
        {
            return await _dbContext.Workplaces.FindAsync(id);
        }

        public async Task<int> CreateWorkplaceAsync(Workplace workplace)
        {
            _dbContext.Workplaces.Add(workplace);
            await _dbContext.SaveChangesAsync();
            return workplace.Id;
        }

        public async Task UpdateWorkplaceAsync(Workplace workplace)
        {
            _dbContext.Workplaces.Update(workplace);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteWorkplaceAsync(Workplace workplace)
        {
            _dbContext.Workplaces.Remove(workplace);
            await _dbContext.SaveChangesAsync();
        }
    }
}
