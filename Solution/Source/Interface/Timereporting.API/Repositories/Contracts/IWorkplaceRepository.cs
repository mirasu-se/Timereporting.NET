using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories.Contracts
{
    public interface IWorkplaceRepository
    {
        Task<int> CreateWorkplaceAsync(Workplace workplace);
        Task DeleteWorkplaceAsync(Workplace workplace);
        Task<IEnumerable<Workplace>> GetAllWorkplacesAsync();
        Task<Workplace> GetWorkplaceByIdAsync(int id);
        Task UpdateWorkplaceAsync(Workplace workplace);
    }
}