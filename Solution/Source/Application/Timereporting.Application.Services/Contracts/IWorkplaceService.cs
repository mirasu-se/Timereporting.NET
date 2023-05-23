using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Application.Services.Contracts
{
    public interface IWorkplaceService
    {
        Task<int> CreateWorkplaceAsync(WorkplaceDto workplace);
        Task DeleteWorkplaceAsync(Guid id);
        Task<IEnumerable<WorkplaceDto>> GetAllWorkplacesAsync();
        Task<WorkplaceDto> GetWorkplaceByIdAsync(Guid id);
        Task UpdateWorkplaceAsync(WorkplaceDto workplace);
    }
}