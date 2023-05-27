using Microsoft.AspNetCore.Http;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Services
{
    public interface IWorkplaceService
    {
        Task CreateWorkplaceAsync(WorkplaceDataModel workplaceDataModel);

        Task DeleteWorkplaceAsync(int id);

        Task<IEnumerable<WorkplaceDataModel>> GetAllWorkplacesAsync();

        Task<WorkplaceDataModel> GetWorkplaceByIdAsync(int id);

        Task UpdateWorkplaceAsync(int id, WorkplaceDataModel updatedWorkplaceDataModel);

        Task<string> UploadImageAsync(int id, IFormFile file, string storageDirectory);
    }
}