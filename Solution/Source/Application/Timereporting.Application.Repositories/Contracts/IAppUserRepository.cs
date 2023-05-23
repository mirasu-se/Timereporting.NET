using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Repositories.Contracts
{
    public interface IAppUserRepository
    {
        Task<int> CreateUserAsync(AppUserDto user);
        Task DeleteUserAsync(AppUserDto user);
        Task<List<AppUserDto>> GetAllUsersAsync();
        Task<AppUserDto> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(AppUserDto user);
    }
}