using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Timereporting.Infrastructure.Data.Entities.Timereport
{
    public class TimereportEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue(0)]
        public int Id { get; set; }

        [Required]
        public Guid UserUUID { get; set; }

        [Required]
        [ForeignKey(nameof(Workplace))]
        public Guid WorkplaceUUID { get; set; }

        [Required]
        public Guid TimeReportUUID { get; set; }

        [ForeignKey(nameof(ReportTypeEntity.Id))]
        public int SubFilterId { get; set; }

        [MaxLength(1024)]
        public string? Description { get; set; }

        [MaxLength(255)]
        public string? ImageFileName { get; set; }

        [MaxLength(255)]
        public string ImageFilePath { get; set; }

        [MaxLength(48)]
        public string ImageFileContentType { get; set; }

        [Required]
        public byte[] ImageFileData { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public float? TimeStarted { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public float? TimeEnded { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public float? TotalHours { get; set; }

        public bool? IsOpened { get; set; }

        [DataType(DataType.Time)]
        public DateTime? TimeOpened { get; set; }

        public bool? IsClosed { get; set; }

        [DataType(DataType.Time)]
        public DateTime? TimeFinalized { get; set; }

        [Required]
        public Guid UserFinalized { get; set; }

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
