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

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsAsync(Guid? workplaceId, DateTime? fromDate, DateTime? toDate)
        {
            if (workplaceId.HasValue && fromDate.HasValue && toDate.HasValue)
            {
                return await GetTimereportsBetweenDatesAsync(workplaceId.Value, fromDate.Value, toDate.Value);
            }
            else if (workplaceId.HasValue && fromDate.HasValue)
            {
                return await GetTimereportsByStartDateAsync(workplaceId.Value, fromDate.Value);
            }
            else if (workplaceId.HasValue && toDate.HasValue)
            {
                return await GetTimereportsByEndDateAsync(workplaceId.Value, toDate.Value);
            }
            else if (workplaceId.HasValue)
            {
                return await GetTimereportsByWorkplaceAsync(workplaceId.Value);
            }
            else if (fromDate.HasValue && toDate.HasValue)
            {
                return await GetTimereportsBetweenDatesForAllWorkplacesAsync(fromDate.Value, toDate.Value);
            }
            else if (fromDate.HasValue)
            {
                return await GetTimereportsByStartDateForAllWorkplacesAsync(fromDate.Value);
            }
            else if (toDate.HasValue)
            {
                return await GetTimereportsByEndDateForAllWorkplacesAsync(toDate.Value);
            }
            else
            {
                return await GetAllTimereportsAsync();
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByEndDateAsync(Guid workplaceId, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.WorkplaceId == workplaceId && t.Date <= toDate.Date).OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId} up to end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.Date >= fromDate.Date && t.Date <= toDate.Date).OrderBy(t => t.Id).ToListAsync();
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
                return await _dbContext.Timereports.Where(t => t.Date >= fromDate).OrderBy(t => t.Id).ToListAsync();
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
                return await _dbContext.Timereports.Where(t => t.Date <= toDate.Date).OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports up to end date {toDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsBetweenDatesAsync(Guid workplaceId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.WorkplaceId == workplaceId && t.Date >= fromDate.Date && t.Date <= toDate.Date).OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId} between start date {fromDate} and end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByStartDateAsync(Guid workplaceId, DateTime fromDate)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.WorkplaceId == workplaceId && t.Date == fromDate).OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId} and start date {fromDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetTimereportsByWorkplaceAsync(Guid workplaceId)
        {
            try
            {
                return await _dbContext.Timereports.Where(t => t.WorkplaceId == workplaceId).OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportEntity>> GetAllTimereportsAsync()
        {
            try
            {
                return await _dbContext.Timereports.OrderBy(t => t.Id).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving timereports.");
                throw;
            }
        }


        public async Task<TimereportEntity> GetTimereportByIdAsync(Guid workplaceId)
        {
            try
            {
                var timereport = await _dbContext.Timereports.FirstOrDefaultAsync(t => t.WorkplaceId == workplaceId);
                if (timereport != null)
                {
                    // The timereport exists
                    return timereport;
                }
                else
                {
                    // The timereport with the given workplaceId doesn't exist
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with workplaceId {workplaceId}.");
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
                _logger.LogError(ex, $"Error occurred while updating timereport with workplaceId {timereport.Id}.");
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
                _logger.LogError(ex, $"Error occurred while deleting timereport with workplaceId {timereport.Id}.");
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