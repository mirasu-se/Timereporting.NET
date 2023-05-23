using Timereporting.Interaction.DTO.Timereport;

namespace Timereporting.Application.Repositories.Contracts
{
    public interface IReportTypeRepository
    {
        Task<int> CreateReportTypeAsync(ReportTypeDto reportType);
        Task DeleteReportTypeAsync(ReportTypeDto reportType);
        Task<IEnumerable<ReportTypeDto>> GetAllReportTypesAsync();
        Task<ReportTypeDto> GetReportTypeByIdAsync(int id);
        Task UpdateReportTypeAsync(ReportTypeDto reportType);
    }
}