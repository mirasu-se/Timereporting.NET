using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Infrastructure.Data.Seeders;

namespace Timereporting.Api.Services.Seeding
{
    /// Used to perform database schema migration and data seeding at application startup
    public class DbSeederHostedService : IHostedService
    {
        // We need to inject the IServiceProvider so we can create 
        // the scoped service, FiscalDataDbContext
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<DbSeederHostedService> _logger;

        public DbSeederHostedService(
            IServiceProvider serviceProvider,
            ILogger<DbSeederHostedService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            // Create a new scope to retrieve scoped services, as the DbContext class
            // is registered as "scoped"
            using (var scope = _serviceProvider.CreateScope())
            {
                await IdentityDataSeeder<AppUserEntity, IdentityRole>.SeedDataAsync(
                    scope.ServiceProvider,
                    _logger);
            }
        }

        // Just return, nothing to clean up
        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
