using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Repositories
{
    public class WorkplaceRepository : IWorkplaceRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<WorkplaceRepository> _logger;

        public WorkplaceRepository(AppDbContext dbContext, ILogger<WorkplaceRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<IEnumerable<WorkplaceEntity>> GetAllWorkplacesAsync()
        {
            try
            {
                return await _dbContext.Workplaces.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving workplaces.");
                throw;
            }
        }

        public async Task<WorkplaceEntity> GetWorkplaceByIdAsync(int id)
        {
            try
            {
                return await _dbContext.Workplaces.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving workplace with ID {id}.");
                throw;
            }
        }

        public async Task CreateWorkplaceAsync(WorkplaceEntity workplace)
        {
            try
            {
                _dbContext.Workplaces.Add(workplace);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating workplace.");
                throw;
            }
        }

        public async Task UpdateWorkplaceAsync(WorkplaceEntity workplace)
        {
            try
            {
                _dbContext.Entry(workplace).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating workplace with ID {workplace.Id}.");
                throw;
            }
        }

        public async Task DeleteWorkplaceAsync(WorkplaceEntity workplace)
        {
            try
            {
                _dbContext.Workplaces.Remove(workplace);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting workplace with ID {workplace.Id}.");
                throw;
            }
        }

        // Add other repository methods as needed

        public async Task<int> SaveChangesAsync()
        {
            try
            {
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while saving changes.");
                throw;
            }
        }
    }
}