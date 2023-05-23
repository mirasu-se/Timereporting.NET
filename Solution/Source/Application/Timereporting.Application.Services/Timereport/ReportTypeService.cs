using Timereporting.Application.Repositories.Contracts;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO.Timereport;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Timereporting.Application.Services.Timereport
{
    public class ReportTypeService : IReportTypeService
    {
        private readonly IReportTypeRepository _reportTypeRepository;

        public ReportTypeService(IReportTypeRepository reportTypeRepository)
        {
            _reportTypeRepository = reportTypeRepository;
        }

        public async Task<IEnumerable<ReportTypeDto>> GetAllReportTypes()
        {
            return await _reportTypeRepository.GetAllReportTypesAsync();
        }

        public async Task<ReportTypeDto> GetReportTypeById(int id)
        {
            return await _reportTypeRepository.GetReportTypeByIdAsync(id);
        }

        public async Task<int> CreateReportType(ReportTypeDto reportType)
        {
            return await _reportTypeRepository.CreateReportTypeAsync(reportType);
        }

        public async Task UpdateReportType(ReportTypeDto existingReportType, ReportTypeDto updatedReportType)
        {
            existingReportType.Name = updatedReportType.Name;
            existingReportType.Description = updatedReportType.Description;

            await _reportTypeRepository.UpdateReportTypeAsync(existingReportType);
        }

        public async Task DeleteReportType(ReportTypeDto reportType)
        {
            await _reportTypeRepository.DeleteReportTypeAsync(reportType);
        }
    }
}