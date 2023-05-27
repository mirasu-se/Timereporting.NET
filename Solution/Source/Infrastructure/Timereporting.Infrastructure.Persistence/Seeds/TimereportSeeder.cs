using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Persistence.Seeds
{
    public class TimereportSeeder
    {
        private static async Task SeedTimereportsAsync(AppDbContext context, List<TimereportEntity> timereports)
        {
            if (!context.Timereports.Any())
            {
                await context.Timereports.AddRangeAsync(timereports);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedDataAsync(AppDbContext context)
        {
            var timereports = new List<TimereportEntity>
            {
                new TimereportEntity
                {
                    WorkplaceId = 2,
                    Name = "Städning Mellangatan 8",
                    Date = new DateTime(2010, 9, 5, 10, 30, 0),
                    Hours = 4.5m,
                    Info = "Städning av kontorsutrymmen",
                    ImageUrl = null,
                    ImageData = null
                },
                new TimereportEntity
                {
                    WorkplaceId = 15,
                    Name = "Installation Götabergsgatan 3",
                    Date = new DateTime(2011, 3, 12, 8, 0, 0),
                    Hours = 7.25m,
                    Info = "Installation av VVS-system",
                    ImageUrl = null,
                    ImageData = null
                },
                new TimereportEntity
                {
                    WorkplaceId = 5,
                    Name = "Målning Åsgatan 12",
                    Date = new DateTime(2012, 6, 20, 13, 15, 0),
                    Hours = 3.0m,
                    Info = "Målning av väggar och tak",
                    ImageUrl = null,
                    ImageData = null
                }
            };

            await SeedTimereportsAsync(context, timereports);
        }
    }
}