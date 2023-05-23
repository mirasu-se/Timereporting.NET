using Timereporting.Application.Repositories.Contracts;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Timereporting.Application.Services.Application
{
    public class AppUserService : IAppUserService
    {
        private readonly IAppUserRepository _userRepository;

        public AppUserService(IAppUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<AppUserDto>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<AppUserDto> GetUserById(Guid id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task<int> CreateUser(AppUserDto user)
        {
            return await _userRepository.CreateUserAsync(user);
        }

        public async Task UpdateUser(AppUserDto existingUser, AppUserDto updatedUser)
        {
            existingUser.UserName = updatedUser.UserName;
            existingUser.NormalizedUserName = updatedUser.NormalizedUserName;
            existingUser.Email = updatedUser.Email;
            existingUser.NormalizedEmail = updatedUser.NormalizedEmail;
            existingUser.EmailConfirmed = updatedUser.EmailConfirmed;
            existingUser.PasswordHash = updatedUser.PasswordHash;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.PhoneNumberConfirmed = updatedUser.PhoneNumberConfirmed;
            existingUser.TwoFactorEnabled = updatedUser.TwoFactorEnabled;
            existingUser.LockoutEnd = updatedUser.LockoutEnd;
            existingUser.LockoutEnabled = updatedUser.LockoutEnabled;
            existingUser.AccessFailedCount = updatedUser.AccessFailedCount;

            await _userRepository.UpdateUserAsync(existingUser);
        }

        public async Task DeleteUser(AppUserDto user)
        {
            await _userRepository.DeleteUserAsync(user);
        }
    }
}