using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services.Contracts
{
    public interface IWorkplaceService
    {
        int CreateWorkplaceAsync(Workplace workplace);
        void DeleteWorkplaceAsync(int id);
        IEnumerable<Workplace> GetAllWorkplacesAsync();
        Workplace GetWorkplaceByIdAsync(int id);
        void UpdateWorkplaceAsync(Workplace workplace);
    }
}