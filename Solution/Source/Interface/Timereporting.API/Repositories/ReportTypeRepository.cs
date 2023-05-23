using Microsoft.EntityFrameworkCore;
using Timereporting.Api.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories
{
    public class ReportTypeRepository : IReportTypeRepository
    {
        private readonly AppDbContext _dbContext;

        public ReportTypeRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ReportType>> GetAllReportTypesAsync()
        {
            return await _dbContext.ReportTypes.ToListAsync();
        }

        public async Task<ReportType> GetReportTypeByIdAsync(int id)
        {
            return await _dbContext.ReportTypes.FindAsync(id);
        }

        public async Task<int> CreateReportTypeAsync(ReportType reportType)
        {
            _dbContext.ReportTypes.Add(reportType);
            await _dbContext.SaveChangesAsync();
            return reportType.Id;
        }

        public async Task UpdateReportTypeAsync(ReportType reportType)
        {
            _dbContext.ReportTypes.Update(reportType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteReportTypeAsync(ReportType reportType)
        {
            _dbContext.ReportTypes.Remove(reportType);
            await _dbContext.SaveChangesAsync();
        }
    }
}
