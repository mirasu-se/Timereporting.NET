using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Models.Api
{
    public class WorkplaceRequestModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }

        public DateTime CreatedTime { get; set; }
    }
}
