using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Infrastructure.Data.Repositories
{
    public class ReportSeedingRepository
    {
        private static async Task SeedReportTypesAsync(AppDbContext context)
        {
            if (!context.ReportTypes.Any())
            {
                var reportTypes = new List<ReportType>
                    {
                        new ReportType
                        {
                            Name = "Report Type 1",
                            IsActive = true,
                            UserCreated = Guid.NewGuid(),
                            TimeCreated = DateTime.Now
                        },
                        new ReportType
                        {
                            Name = "Report Type 2",
                            IsActive = true,
                            UserCreated = Guid.NewGuid(),
                            TimeCreated = DateTime.Now
                        }
                    };

                await context.ReportTypes.AddRangeAsync(reportTypes);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedDataAsync(AppDbContext context)
        {
            await SeedReportTypesAsync(context);
        }
    }
}
