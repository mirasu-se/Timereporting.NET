using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Timereporting.Application.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities.Workplace;
using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Application.Repositories.Workplace
{
    public class WorkplaceRepository : IWorkplaceRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public WorkplaceRepository(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<WorkplaceDto>> GetAllWorkplacesAsync()
        {
            var workplaces = await _dbContext.Workplaces.ToListAsync();
            return _mapper.Map<IEnumerable<WorkplaceDto>>(workplaces);
        }

        public async Task<WorkplaceDto> GetWorkplaceByIdAsync(Guid id)
        {
            var workplace = await _dbContext.Workplaces.FindAsync(id);
            return _mapper.Map<WorkplaceDto>(workplace);
        }

        public async Task<int> CreateWorkplaceAsync(WorkplaceDto workplace)
        {
            var workplaceEntity = _mapper.Map<WorkplaceEntity>(workplace);
            _dbContext.Workplaces.Add(workplaceEntity);
            await _dbContext.SaveChangesAsync();
            return workplaceEntity.Id;
        }

        public async Task UpdateWorkplaceAsync(WorkplaceDto workplace)
        {
            var workplaceEntity = _mapper.Map<WorkplaceEntity>(workplace);
            _dbContext.Workplaces.Update(workplaceEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteWorkplaceAsync(WorkplaceDto workplace)
        {
            var workplaceEntity = _mapper.Map<WorkplaceEntity>(workplace);
            _dbContext.Workplaces.Remove(workplaceEntity);
            await _dbContext.SaveChangesAsync();
        }
    }
}