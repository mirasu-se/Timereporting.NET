using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories.Contracts
{
    public interface IReportTypeRepository
    {
        Task<int> CreateReportTypeAsync(ReportType reportType);
        Task DeleteReportTypeAsync(ReportType reportType);
        Task<IEnumerable<ReportType>> GetAllReportTypesAsync();
        Task<ReportType> GetReportTypeByIdAsync(int id);
        Task UpdateReportTypeAsync(ReportType reportType);
    }
}