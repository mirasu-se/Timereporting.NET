using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Timereporting.Infrastructure.Data.Entities.Application
{
    public class AppUserEntity : IdentityUser
    {
        public int Id { get; set; }
        [PersonalData]
        public string? FirstName { get; set; }

        [PersonalData]
        public string? LastName { get; set; }

        [PersonalData]
        public string? FullName { get; set; }

        [PersonalData]
        public string? Description { get; set; }

        [PersonalData]
        public DateTime? BirthDate { get; set; }
    }
}
