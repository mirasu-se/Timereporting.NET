using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Timereporting.Application.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities.Timereport;
using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Repositories.Timereport
{
    public class TimereportRepository : ITimereportRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public TimereportRepository(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TimereportDto>> GetAllTimereportsAsync()
        {
            var timereports = await _dbContext.Timereports.ToListAsync();
            return _mapper.Map<IEnumerable<TimereportDto>>(timereports);
        }

        public async Task<TimereportDto> GetTimereportByIdAsync(Guid id)
        {
            var timereport = await _dbContext.Timereports.FindAsync(id);
            return _mapper.Map<TimereportDto>(timereport);
        }

        public async Task<int> CreateTimereportAsync(TimereportDto timereport)
        {
            var timereportEntity = _mapper.Map<TimereportEntity>(timereport);
            _dbContext.Timereports.Add(timereportEntity);
            await _dbContext.SaveChangesAsync();
            return timereportEntity.Id;
        }

        public async Task UpdateTimereportAsync(TimereportDto timereport)
        {
            var timereportEntity = _mapper.Map<TimereportEntity>(timereport);
            _dbContext.Timereports.Update(timereportEntity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteTimereportAsync(TimereportDto timereport)
        {
            var timereportEntity = _mapper.Map<TimereportEntity>(timereport);
            _dbContext.Timereports.Remove(timereportEntity);
            await _dbContext.SaveChangesAsync();
        }
    }
}