using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Application.Repositories.Contracts
{
    public interface IWorkplaceRepository
    {
        Task<int> CreateWorkplaceAsync(WorkplaceDto workplace);
        Task DeleteWorkplaceAsync(WorkplaceDto workplace);
        Task<IEnumerable<WorkplaceDto>> GetAllWorkplacesAsync();
        Task<WorkplaceDto> GetWorkplaceByIdAsync(Guid id);
        Task UpdateWorkplaceAsync(WorkplaceDto workplace);
    }
}