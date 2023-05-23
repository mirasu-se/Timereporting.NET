using Timereporting.Api.Repositories.Contracts;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services
{
    public class ReportTypeService : IReportTypeService
    {
        private readonly IReportTypeRepository _reportTypeRepository;

        public ReportTypeService(IReportTypeRepository reportTypeRepository)
        {
            _reportTypeRepository = reportTypeRepository;
        }

        public IEnumerable<ReportType> GetAllReportTypes()
        {
            return _reportTypeRepository.GetAllReportTypesAsync().Result;
        }

        public ReportType GetReportTypeById(int id)
        {
            return _reportTypeRepository.GetReportTypeByIdAsync(id).Result;
        }

        public int CreateReportType(ReportType reportType)
        {
            return _reportTypeRepository.CreateReportTypeAsync(reportType).Result;
        }

        public void UpdateReportType(ReportType existingReportType, ReportType updatedReportType)
        {
            existingReportType.Name = updatedReportType.Name;
            existingReportType.Description = updatedReportType.Description;

            _reportTypeRepository.UpdateReportTypeAsync(existingReportType).Wait();
        }

        public void DeleteReportType(ReportType reportType)
        {
            _reportTypeRepository.DeleteReportTypeAsync(reportType).Wait();
        }
    }
}