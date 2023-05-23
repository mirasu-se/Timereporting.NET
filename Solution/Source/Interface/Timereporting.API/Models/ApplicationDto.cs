namespace Timereporting.Infrastructure.Data.Entities.Application
{
    namespace Timereporting.Infrastructure.Data.Entities.Application.User
    {
        public class ApplicationDto
        {
            public int Id { get; set; }

            public Guid UserUUID { get; set; }

            public string UserName { get; set; }

            public string NormalizedUserName { get; set; }

            public string Email { get; set; }

            public string NormalizedEmail { get; set; }

            public bool EmailConfirmed { get; set; }

            public string? PasswordHash { get; set; }

            public string? SecurityStamp { get; set; }

            public string? ConcurrencyStamp { get; set; }

            public string? PhoneNumber { get; set; }

            public bool PhoneNumberConfirmed { get; set; }

            public bool TwoFactorEnabled { get; set; }

            public DateTimeOffset? LockoutEnd { get; set; }

            public bool LockoutEnabled { get; set; }

            public int AccessFailedCount { get; set; }

            public bool IsActive { get; set; }

            public Guid UserCreated { get; set; }

            public DateTime TimeCreated { get; set; }

            public DateTime? LastTimeUpdated { get; set; }

            public Guid? UserUpdated { get; set; }

            public bool? IsDeleted { get; set; }

            public DateTime? TimeDeleted { get; set; }

            public Guid? UserDeleted { get; set; }
        }
    }
}
