using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Timereporting.Infrastructure.Data.Entities
{
    [Table("report_type")]
    public class ReportType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DefaultValue(0)]
        public int Id { get; set; }

        [MaxLength(256)]
        public string Name { get; set; }

        [MaxLength(1024)]
        public string Description { get; set; }

        public bool IsActive { get; set; }

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
