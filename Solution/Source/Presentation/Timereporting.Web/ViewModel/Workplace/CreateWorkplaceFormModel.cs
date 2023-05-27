using System.ComponentModel.DataAnnotations;

namespace Timereporting.Web.ViewModel.Workplace
{
    public class CreateWorkplaceFormModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string? Name { get; set; }

        [StringLength(500, ErrorMessage = "Info must not exceed 500 characters.")]
        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
