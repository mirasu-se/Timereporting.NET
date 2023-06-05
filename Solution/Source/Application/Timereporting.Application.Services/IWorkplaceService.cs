using Microsoft.AspNetCore.Http;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Services
{
    public interface IWorkplaceService
    {
        Task CreateWorkplaceAsync(WorkplaceDataModel workplaceDataModel);

        Task DeleteWorkplaceAsync(Guid id);

        Task<IEnumerable<WorkplaceDataModel>> GetAllWorkplacesAsync();

        Task<WorkplaceDataModel> GetWorkplaceByIdAsync(Guid id);

        Task UpdateWorkplaceAsync(Guid id, WorkplaceDataModel updatedWorkplaceDataModel);
    }
}