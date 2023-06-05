using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Persistence.Seeds
{
    public class TimereportSeeder
    {
        public static readonly Guid TimereportId1 = Guid.Parse("c6eb15ae-187d-45c6-a810-091c41ebefc4");
        public static readonly Guid TimereportId2 = Guid.Parse("9c8b5cd4-3fe3-4ed0-92e3-8d3f74f9a7c3");

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
                    WorkplaceId = WorkplaceSeeder.WorkplaceId1,
                    TimereportId = TimereportId1,
                    Date = new DateTime(2010, 9, 5, 10, 30, 0),
                    Hours = 4.5m,
                    Info = "Rivning av befintliga ytor, inklusive borttagning av köksskåp, golvbeläggning och väggmaterial.",
                    ImageUrl = "img/timereport/TR_ID_c6eb15ae-187d-45c6-a810-091c41ebefc4.png",
                    ImageData = null
                },
                new TimereportEntity
                {
                    WorkplaceId = WorkplaceSeeder.WorkplaceId2,
                    TimereportId = TimereportId2,
                    Date = new DateTime(2011, 3, 12, 8, 0, 0),
                    Hours = 7.25m,
                    Info = "Bedömning av befintligt tak och identifiering av eventuella skador eller läckage.",
                    ImageUrl = "img/timereport/TR_ID_9c8b5cd4-3fe3-4ed0-92e3-8d3f74f9a7c3.png",
                    ImageData = null
                }
            };

            await SeedTimereportsAsync(context, timereports);
        }
    }
}