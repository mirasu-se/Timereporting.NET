using Timereporting.Interaction.DTO;

namespace Timereporting.Application.Services.Contracts
{
    public interface IAppUserService
    {
        Task<int> CreateUser(AppUserDto user);
        Task DeleteUser(AppUserDto user);
        Task<IEnumerable<AppUserDto>> GetAllUsers();
        Task<AppUserDto> GetUserById(Guid id);
        Task UpdateUser(AppUserDto existingUser, AppUserDto updatedUser);
    }
}