using System.ComponentModel.DataAnnotations;

namespace Timereporting.Web.ViewModel.Workplace
{
    public class CreateWorkplaceFormModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string? Name { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
