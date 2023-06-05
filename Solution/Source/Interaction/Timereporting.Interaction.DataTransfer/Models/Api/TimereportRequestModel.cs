using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Models.Api
{
    public class TimereportRequestModel
    {
        public int Id { get; set; }

        public Guid WorkplaceId { get; set; }

        public Guid TimereportId { get; set; }

        public DateTime Date { get; set; }

        public double Hours { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }
    }
}
