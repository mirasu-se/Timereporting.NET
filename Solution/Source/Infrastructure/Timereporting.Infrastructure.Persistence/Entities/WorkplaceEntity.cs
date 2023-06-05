using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timereporting.Infrastructure.Persistence.Entities
{
    public class WorkplaceEntity
    {
        public int Id { get; set; }
        [Key]
        public Guid WorkplaceId { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedTime { get; set; }

        public string? Info { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }
    }
}