using Timereporting.Interaction.DTO.Timereport;

namespace Timereporting.Application.Services.Contracts
{
    public interface IReportTypeService
    {
        Task<int> CreateReportType(ReportTypeDto reportType);
        Task DeleteReportType(ReportTypeDto reportType);
        Task<IEnumerable<ReportTypeDto>> GetAllReportTypes();
        Task<ReportTypeDto> GetReportTypeById(int id);
        Task UpdateReportType(ReportTypeDto existingReportType, ReportTypeDto updatedReportType);
    }
}