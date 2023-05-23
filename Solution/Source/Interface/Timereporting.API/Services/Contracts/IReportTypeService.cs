using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services.Contracts
{
    public interface IReportTypeService
    {
        int CreateReportType(ReportType reportType);
        void DeleteReportType(ReportType reportType);
        IEnumerable<ReportType> GetAllReportTypes();
        ReportType GetReportTypeById(int id);
        void UpdateReportType(ReportType existingReportType, ReportType updatedReportType);
    }
}