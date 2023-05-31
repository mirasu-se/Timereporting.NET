using System.ComponentModel.DataAnnotations;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Web.ViewModel.Timereport
{
    public class CreateTimereportFormModel
    {
        public IEnumerable<WorkplaceDataModel>? Workplaces { get; set; }

        public int Id { get; set; }

        [Required(ErrorMessage = "The WorkplaceId field is required.")]
        public int WorkplaceId { get; set; }
        public string? Name { get; set; }
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "The Hours field is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "The Hours field must be greater than 0.")]
        public double Hours { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
