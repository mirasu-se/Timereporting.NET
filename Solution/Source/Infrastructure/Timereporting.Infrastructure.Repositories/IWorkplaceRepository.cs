﻿using Timereporting.Infrastructure.Persistence.Entities;

namespace Timereporting.Infrastructure.Repositories
{
    public interface IWorkplaceRepository
    {
        Task CreateWorkplaceAsync(WorkplaceEntity workplace);
        Task DeleteWorkplaceAsync(WorkplaceEntity workplace);
        Task<IEnumerable<WorkplaceEntity>> GetAllWorkplacesAsync();
        Task<WorkplaceEntity> GetWorkplaceByIdAsync(Guid workplaceId);
        Task<int> SaveChangesAsync();
        Task UpdateWorkplaceAsync(WorkplaceEntity workplace);
    }
}