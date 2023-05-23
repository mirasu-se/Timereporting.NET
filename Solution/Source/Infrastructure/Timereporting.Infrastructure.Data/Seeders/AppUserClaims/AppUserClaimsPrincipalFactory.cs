using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Timereporting.Infrastructure.Data.Entities.Application;

namespace Timereporting.Infrastructure.Data.Seeders.AppUserClaims
{
    public class AppUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUserEntity, IdentityRole>
    {
        public AppUserClaimsPrincipalFactory(
            UserManager<AppUserEntity> userManager
            , RoleManager<IdentityRole> roleManager
            , IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor)
        { }

        public async override Task<ClaimsPrincipal> CreateAsync(AppUserEntity user)
        {
            var principal = await base.CreateAsync(user);

            if (!string.IsNullOrWhiteSpace(user.FullName))
            {
                ((ClaimsIdentity)principal.Identity).AddClaims(new[] {
                    new Claim("FullName", user.FullName)
                });
            }

            // You can add more properties that you want to expose on the User object below

            return principal;
        }
    }
}
