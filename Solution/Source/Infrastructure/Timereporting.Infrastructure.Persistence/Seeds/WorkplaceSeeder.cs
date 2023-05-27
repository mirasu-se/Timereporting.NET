using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Persistence;

namespace Timereporting.Infrastructure.Persistence.Seeds
{
    public class WorkplaceSeeder
    {
        private static async Task SeedWorkplacesAsync(AppDbContext context)
        {
            if (!context.Workplaces.Any())
            {
                var workplaces = new List<WorkplaceEntity>
                {
                    new WorkplaceEntity
                    {
                        Name = "Köksrenovering Kungsgatan 19",
                        Info = "Renovation of the kitchen area, including installation of new cabinets, countertops, and appliances.",
                        CreatedTime = DateTime.Now
                    },
                    new WorkplaceEntity
                    {
                        Name = "Takläggning Skolgatan 8",
                        Info = "Roofing project for the building located at Skolgatan 8, involving the installation of new roofing materials and ensuring proper insulation.",
                        CreatedTime = DateTime.Now
                    },
                    new WorkplaceEntity
                    {
                        Name = "Byggnation Storgatan 12",
                        Info = "Construction project at Storgatan 12, encompassing the creation of a new building structure, including foundation, walls, and floors.",
                        CreatedTime = DateTime.Now
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