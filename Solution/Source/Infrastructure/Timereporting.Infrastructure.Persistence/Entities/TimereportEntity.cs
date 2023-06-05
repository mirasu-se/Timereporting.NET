using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timereporting.Infrastructure.Persistence.Entities
{
    public class TimereportEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Workplace")]
        public Guid WorkplaceId { get; set; }

        public Guid TimereportId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Hours must be greater than zero.")]
        public decimal Hours { get; set; }

        public string? Info { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }
    }
}