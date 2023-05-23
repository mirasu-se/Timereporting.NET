using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Repositories.Contracts
{
    public interface IAppUserRepository
    {
        Task<int> CreateUserAsync(AppUser user);
        Task DeleteUserAsync(AppUser user);
        Task<List<AppUser>> GetAllUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUserUUIDAsync(Guid userUUID);
        Task UpdateUserAsync(AppUser user);
    }
}