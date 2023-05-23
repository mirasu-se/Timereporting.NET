using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Timereporting.Application.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities.Timereport;
using Timereporting.Interaction.DTO.Timereport;

namespace Timereporting.Application.Repositories.Timereport
{
    public class ReportTypeRepository : IReportTypeRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ReportTypeRepository(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReportTypeDto>> GetAllReportTypesAsync()
        {
            var reportTypes = await _dbContext.ReportTypes.ToListAsync();
            return _mapper.Map<IEnumerable<ReportTypeDto>>(reportTypes);
        }

        public async Task<ReportTypeDto> GetReportTypeByIdAsync(int id)
        {
            var reportType = await _dbContext.ReportTypes.FindAsync(id);
            return _mapper.Map<ReportTypeDto>(reportType);
        }

        public async Task<int> CreateReportTypeAsync(ReportTypeDto reportType)
        {
            var entity = _mapper.Map<ReportTypeEntity>(reportType);
            _dbContext.ReportTypes.Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task UpdateReportTypeAsync(ReportTypeDto reportType)
        {
            var entity = _mapper.Map<ReportTypeEntity>(reportType);
            _dbContext.ReportTypes.Update(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteReportTypeAsync(ReportTypeDto reportType)
        {
            var entity = _mapper.Map<ReportTypeEntity>(reportType);
            _dbContext.ReportTypes.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}