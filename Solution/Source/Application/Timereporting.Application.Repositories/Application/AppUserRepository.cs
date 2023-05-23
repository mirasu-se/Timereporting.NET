using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Timereporting.Application.Repositories.Contracts;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Repositories.Application
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public AppUserRepository(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<AppUserDto>> GetAllUsersAsync()
        {
            var users = await _dbContext.Users.ToListAsync();
            return _mapper.Map<List<AppUserDto>>(users);
        }

        public async Task<AppUserDto> GetUserByIdAsync(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            return _mapper.Map<AppUserDto>(user);
        }

        public async Task<int> CreateUserAsync(AppUserDto user)
        {
            var entity = _mapper.Map<AppUserEntity>(user);
            _dbContext.Users.Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity.Id;
        }

        public async Task UpdateUserAsync(AppUserDto user)
        {
            var entity = _mapper.Map<AppUserEntity>(user);
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(AppUserDto user)
        {
            var entity = _mapper.Map<AppUserEntity>(user);
            _dbContext.Users.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}