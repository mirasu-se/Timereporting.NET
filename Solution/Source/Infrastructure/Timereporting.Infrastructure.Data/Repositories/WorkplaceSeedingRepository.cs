using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Infrastructure.Data.Repositories
{
    public class WorkplaceSeedingRepository
    {
        private static async Task SeedWorkplacesAsync(AppDbContext context)
        {
            if (!context.Workplaces.Any())
            {
                var workplaces = new List<Workplace>
                    {
                        new Workplace
                        {
                            Name = "Workplace 1",
                            WorkplaceUUID = Guid.NewGuid(),
                            Description = "Workplace 1 description",
                            Address = "Address 1",
                            City = "City 1",
                            ZipCode = "12345",
                            UserCreated = Guid.NewGuid(),
                            TimeCreated = DateTime.Now
                        },
                        new Workplace
                        {
                            Name = "Workplace 2",
                            WorkplaceUUID = Guid.NewGuid(),
                            Description = "Workplace 2 description",
                            Address = "Address 2",
                            City = "City 2",
                            ZipCode = "67890",
                            UserCreated = Guid.NewGuid(),
                            TimeCreated = DateTime.Now
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
