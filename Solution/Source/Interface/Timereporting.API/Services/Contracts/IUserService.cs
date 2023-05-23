using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services.Contracts
{
    public interface IUserService
    {
        int CreateUser(AppUser user);
        void DeleteUser(AppUser user);
        IEnumerable<AppUser> GetAllUsers();
        AppUser GetUserById(int id);
        void UpdateUser(AppUser existingUser, AppUser updatedUser);
    }
}