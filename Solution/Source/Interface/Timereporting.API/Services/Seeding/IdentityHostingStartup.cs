using Microsoft.AspNetCore.Hosting;
using Timereporting.Api.Services.Seeding;

[assembly: HostingStartup(typeof(IdentityHostingStartup))]
namespace Timereporting.Api.Services.Seeding
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}
