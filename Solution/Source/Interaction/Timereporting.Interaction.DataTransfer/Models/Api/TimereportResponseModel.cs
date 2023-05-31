using Microsoft.AspNetCore.Http;

namespace Timereporting.Interaction.DataTransfer.Models.Api
{
    public class TimereportResponseModel
    {
        public int Id { get; set; }
        public int WorkplaceId { get; set; }
        public DateTime Date { get; set; }
        public double Hours { get; set; }
        public string? Info { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
