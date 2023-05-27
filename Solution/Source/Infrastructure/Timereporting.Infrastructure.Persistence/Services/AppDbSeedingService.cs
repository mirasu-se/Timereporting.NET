using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Timereporting.Infrastructure.Persistence.Seeds;

namespace Timereporting.Persistence
{
    public class AppDbSeedingService : IHostedService
    {
        private readonly IServiceProvider _services;
        private readonly ILogger<AppDbSeedingService> _logger;
        private CancellationTokenSource? _cancellationTokenSource;

        public AppDbSeedingService(IServiceProvider services, ILogger<AppDbSeedingService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);

            try
            {
                using var scope = _services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var maxRetries = 3;
                var currentRetry = 0;
                var delay = TimeSpan.FromSeconds(5);

                while (currentRetry < maxRetries)
                {
                    try
                    {
                        await context.Database.MigrateAsync(_cancellationTokenSource.Token);
                        await WorkplaceSeeder.SeedDataAsync(context);
                        await TimereportSeeder.SeedDataAsync(context);
                        await context.SaveChangesAsync(_cancellationTokenSource.Token);

                        // Operation succeeded, exit the loop
                        return;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, $"An error occurred while seeding the database; maybe the server isn't currently running. Retrying in {delay.TotalSeconds} seconds...");

                        // Increase the delay for the next retry using exponential backoff
                        delay *= 2;

                        // Wait for the specified delay before the next retry
                        await Task.Delay(delay, _cancellationTokenSource.Token);

                        currentRetry++;
                    }
                }

                // Maximum number of retries reached, throw an exception
                throw new InvalidOperationException($"Failed to seed the database after {maxRetries} retries.");
            }
            catch (OperationCanceledException)
            {
                // Graceful shutdown requested, do not throw an exception
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _cancellationTokenSource?.Cancel();
            return Task.CompletedTask;
        }
    }
}