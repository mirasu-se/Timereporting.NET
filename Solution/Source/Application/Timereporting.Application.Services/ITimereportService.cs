using Microsoft.AspNetCore.Http;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Services
{
    public interface ITimereportService
    {
        Task CreateTimereportAsync(TimereportDataModel timereportDataModel);
        Task DeleteTimereportAsync(int id);
        Task<IEnumerable<TimereportDataModel>> GetAllTimereportsAsync();
        Task<TimereportDataModel> GetTimereportByIdAsync(int id);
        Task<IEnumerable<TimereportDataModel>> GetTimeReportsAsync(int workplaceId, DateTime? fromDate, DateTime? toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesAsync(int workplaceId, DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateAsync(int workplaceId, DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateAsync(int workplaceId, DateTime fromDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate);
        Task<IEnumerable<TimereportDataModel>> GetTimereportsByWorkplaceAsync(int workplaceId);
        Task UpdateTimereportAsync(int id, TimereportDataModel updatedTimereportDataModel);
        Task<string> UploadImageAsync(int id, IFormFile file, string storageDirectory);
    }
}