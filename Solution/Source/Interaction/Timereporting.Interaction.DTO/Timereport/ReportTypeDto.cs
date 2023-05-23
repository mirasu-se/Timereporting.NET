namespace Timereporting.Interaction.DTO.Timereport
{
    public class ReportTypeDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public Guid UserCreated { get; set; }

        public DateTime TimeCreated { get; set; }

        public DateTime? LastTimeUpdated { get; set; }

        public Guid? UserUpdated { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime? TimeDeleted { get; set; }

        public Guid? UserDeleted { get; set; }
    }
}
