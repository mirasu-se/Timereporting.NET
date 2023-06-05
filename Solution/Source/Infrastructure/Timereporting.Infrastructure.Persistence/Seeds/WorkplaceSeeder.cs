using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Persistence.Seeds
{
    public class WorkplaceSeeder
    {
        public static readonly Guid WorkplaceId1 = new("eeb8d773-1c2f-4c8a-b24e-0f95f21a9f12");
        public static readonly Guid WorkplaceId2 = new("b33db1d2-d3dd-4a50-941d-137d6d2776b6");

        private static async Task SeedWorkplacesAsync(AppDbContext context)
        {
            if (!context.Workplaces.Any())
            {
                var workplaces = new List<WorkplaceEntity>
                {
                    new WorkplaceEntity
                    {
                        Id = 1,
                        WorkplaceId = WorkplaceId1,
                        Name = "Köksrenovering Kungsgatan 19",
                        Info = "Vi har mottagit en förfrågan om en köksrenovering på Kungsgatan 19. Uppdraget omfattar ombyggnad och förnyelse av köksutrymmet enligt kundens specifikationer och önskemål.",
                        CreatedTime = Convert.ToDateTime("2017-11-05 20:52:49"),
                        ImageUrl ="img/workplace/WP_ID_eeb8d773-1c2f-4c8a-b24e-0f95f21a9f12.png",
                        ImageData = null

                    },
                    new WorkplaceEntity
                    {
                        Id = 2,
                        WorkplaceId = WorkplaceId2,
                        Name = "Takläggning Skolgatan 8",
                        Info = "Vi har mottagit en förfrågan om ett roofingprojekt för byggnaden på Skolgatan 8. Uppdraget innefattar installation av nya takmaterial samt säkerställande av korrekt isolering.",
                        CreatedTime = Convert.ToDateTime("2017-11-05 20:52:49"),
                        ImageUrl ="img/workplace/WP_ID_b33db1d2-d3dd-4a50-941d-137d6d2776b6.png",
                        ImageData = null
                    }
                };

                await context.Workplaces.AddRangeAsync(workplaces);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedDataAsync(AppDbContext context)
        {
            await SeedWorkplacesAsync(context);
        }
    }
}