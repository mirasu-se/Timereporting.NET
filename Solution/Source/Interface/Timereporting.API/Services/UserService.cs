using Timereporting.Api.Repositories.Contracts;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IAppUserRepository _userRepository;

        public UserService(IAppUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<AppUser> GetAllUsers()
        {
            return _userRepository.GetAllUsersAsync().Result;
        }

        public AppUser GetUserById(int id)
        {
            return _userRepository.GetUserByIdAsync(id).Result;
        }

        public int CreateUser(AppUser user)
        {
            return _userRepository.CreateUserAsync(user).Result;
        }

        public void UpdateUser(AppUser existingUser, AppUser updatedUser)
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

            _userRepository.UpdateUserAsync(existingUser).Wait();
        }

        public void DeleteUser(AppUser user)
        {
            _userRepository.DeleteUserAsync(user).Wait();
        }
    }
}
