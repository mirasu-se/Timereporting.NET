using Microsoft.AspNetCore.Identity;
using Timereporting.Infrastructure.Data.Entities.Application;

namespace Timereporting.Infrastructure.Data.Repositories
{
    public class UserSeedingRepository
    {
        private static async Task SeedApplicationUsersAsync(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                var adminUser = new AppUserEntity
                {
                    Id = 1,
                    UserName = "admin@example.com",
                    NormalizedUserName = "admin@example.com",
                    Email = "admin@example.com",
                    NormalizedEmail = "admin@example.com",
                    EmailConfirmed = true,
                    PhoneNumber = "1234567890",
                    PhoneNumberConfirmed = true,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = 0
                };

                var normalUser = new AppUserEntity
                {
                    Id = 2,
                    UserName = "user@example.com",
                    NormalizedUserName = "user@example.com",
                    Email = "user@example.com",
                    NormalizedEmail = "user@example.com",
                    EmailConfirmed = true,
                    PhoneNumber = "9876543210",
                    PhoneNumberConfirmed = true,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = 0
                };

                var passwordHasher = new PasswordHasher<AppUserEntity>();

                var adminPassword = "Admin123"; // Password for admin user
                var normalUserPassword = "User123"; // Password for normal user

                adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, adminPassword);
                normalUser.PasswordHash = passwordHasher.HashPassword(normalUser, normalUserPassword);

                context.Users.Add(adminUser);
                context.Users.Add(normalUser);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedDataAsync(AppDbContext context)
        {
            await SeedApplicationUsersAsync(context);
        }
    }
}