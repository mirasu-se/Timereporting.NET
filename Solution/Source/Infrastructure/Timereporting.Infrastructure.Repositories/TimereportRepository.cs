using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Repositories
{
    public class TimereportRepository : ITimereportRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<TimereportRepository> _logger;

        public TimereportRepository(AppDbContext dbContext, ILogger<TimereportRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsAsync(int workplaceId, DateTime? fromDate, DateTime? toDate)
        {
            if (workplaceId != 0 && fromDate != null && toDate != null)
            {
                return await GetTimereportsBetweenDatesAsync(workplaceId, fromDate.Value, toDate.Value);
            }
            else if (workplaceId != 0 && fromDate != null)
            {
                return await GetTimereportsByStartDateAsync(workplaceId, fromDate.Value);
            }
            else if (workplaceId != 0 && toDate != null)
            {
                return await GetTimereportsByEndDateAsync(workplaceId, toDate.Value);
            }
            else if (workplaceId != 0)
            {
                return await GetTimereportsByWorkplaceAsync(workplaceId);
            }
            else if (fromDate != null && toDate != null)
            {
                return await GetTimereportsBetweenDatesForAllWorkplacesAsync(fromDate.Value, toDate.Value);
            }
            else if (fromDate != null)
            {
                return await GetTimereportsByStartDateForAllWorkplacesAsync(fromDate.Value);
            }
            else if (toDate != null)
            {
                return await GetTimereportsByEndDateForAllWorkplacesAsync(toDate.Value);
            }
            else
            {
                return await GetAllTimereportsAsync();
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateAsync(int workplaceId, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Id == workplaceId && t.Date <= toDate.Date).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} up to end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Date >= fromDate.Date && t.Date <= toDate.Date).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports between start date {fromDate} and end date {toDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Date >= fromDate).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports starting from date {fromDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Date <= toDate.Date).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports up to end date {toDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesAsync(int workplaceId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Id == workplaceId && t.Date >= fromDate.Date && t.Date <= toDate.Date).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} between start date {fromDate} and end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateAsync(int workplaceId, DateTime fromDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Id == workplaceId && t.Date == fromDate).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} and start date {fromDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByWorkplaceAsync(int workplaceId)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Id == workplaceId).OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetAllTimereportsAsync()
        {
            try
            {
                return await _dbContext.Timereports.OrderBy(t => t.WorkplaceId) // Sort by Id in ascending order
                            .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving timereports.");
                throw;
            }
        }


        public async Task<TimereportEntity> GetTimereportByIdAsync(int id)
        {
            try
            {
                return await _dbContext.Timereports.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with ID {id}.");
                throw;
            }
        }

        public async Task CreateTimereportAsync(TimereportEntity timereport)
        {
            try
            {
                _dbContext.Timereports.Add(timereport);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating timereport.");
                throw;
            }
        }

        public async Task UpdateTimereportAsync(TimereportEntity timereport)
        {
            try
            {
                _dbContext.Entry(timereport).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating timereport with ID {timereport.Id}.");
                throw;
            }
        }

        public async Task DeleteTimereportAsync(TimereportEntity timereport)
        {
            try
            {
                _dbContext.Timereports.Remove(timereport);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting timereport with ID {timereport.Id}.");
                throw;
            }
        }

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