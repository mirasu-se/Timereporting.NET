using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Timereporting.Infrastructure.Data.Entities
{
    [Table("workplace")]
    public class Workplace
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue(0)]
        public int Id { get; set; }

        [Required]
        public Guid WorkplaceUUID { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(1024)]
        public string? Description { get; set; }

        [MaxLength(255)]
        public string? ImageFileName { get; set; }

        [MaxLength(255)]
        public string? ImageFilePath { get; set; }

        [MaxLength(48)]
        public string? ImageFileContentType { get; set; }

        public byte[]? ImageFileData { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Address { get; set; }

        [Required]
        [MaxLength(255)]
        public string? City { get; set; }

        [Required]
        [MaxLength(10)]
        public string? ZipCode { get; set; }

        [Required]
        public Guid UserCreated { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public DateTime TimeCreated { get; set; }

        [DataType(DataType.Time)]
        public DateTime? LastTimeUpdated { get; set; }

        public Guid? UserUpdated { get; set; }

        public bool? IsDeleted { get; set; }

        [DataType(DataType.Time)]
        public DateTime? TimeDeleted { get; set; }

        public Guid? UserDeleted { get; set; }
    }
}
