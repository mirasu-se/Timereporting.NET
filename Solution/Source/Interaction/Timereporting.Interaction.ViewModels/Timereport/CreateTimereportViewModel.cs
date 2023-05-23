using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Timereporting.Interaction.ViewModels.Timereport
{
    public class CreateTimereportViewModel : IValidatableObject
    {
        [Required(ErrorMessage = "You must select report type.")]
        public int SubFilterId { get; set; }

        [Required(ErrorMessage = "User UUID is required.")]
        public Guid UserUUID { get; set; }

        [Required(ErrorMessage = "Workplace UUID is required.")]
        public Guid WorkplaceUUID { get; set; }

        [MaxLength(1024, ErrorMessage = "Description cannot exceed 1024 characters.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Image file is required.")]
        public IFormFile ImageFile { get; set; }

        public float? TimeStarted { get; set; }

        public float? TimeEnded { get; set; }

        public bool? IsOpened { get; set; }

        public DateTime? TimeOpened { get; set; }

        public bool? IsClosed { get; set; }

        public DateTime? TimeClosed { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (SubFilterId == 1)
            {
                if (TimeStarted == null)
                    yield return new ValidationResult("Time started is required.", new[] { nameof(TimeStarted) });

                if (ImageFile == null || ImageFile.Length == 0)
                    yield return new ValidationResult("Image file is required.", new[] { nameof(ImageFile) });

                IsOpened = true; // Set IsOpened to true
                TimeOpened = DateTime.Now; // Set TimeOpened to current date and time
            }
            else
            {
                if (TimeEnded == null)
                    yield return new ValidationResult("Time ended is required.", new[] { nameof(TimeEnded) });

                if (ImageFile == null || ImageFile.Length == 0)
                    yield return new ValidationResult("Image file is required.", new[] { nameof(ImageFile) });

                IsOpened = false; // Set IsOpened to false
                TimeClosed = DateTime.Now; // Set TimeClosed to current date and time
            }
        }
    }
}
