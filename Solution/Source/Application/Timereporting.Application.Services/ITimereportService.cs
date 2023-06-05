using Microsoft.AspNetCore.Http;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Services
{
    public interface ITimereportService
    {
        Task CreateTimereportAsync(TimereportDataModel timereportDataModel);
        Task DeleteTimereportAsync(Guid id);
        Task<IEnumerable<TimereportDataModel>> GetAllTimereportsAsync();
        Task<TimereportDataModel> GetTimereportByIdAsync(Guid id);
        Task<IEnumerable<TimereportDataModel>> GetTimeReportsAsync(Guid workplaceId, DateTime? fromDate, DateTime? toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesAsync(Guid workplaceId, DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateAsync(Guid workplaceId, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateAsync(Guid workplaceId, DateTime fromDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByWorkplaceAsync(Guid workplaceId);
        Task UpdateTimereportAsync(Guid id, TimereportDataModel updatedTimereportDataModel);
    }
}