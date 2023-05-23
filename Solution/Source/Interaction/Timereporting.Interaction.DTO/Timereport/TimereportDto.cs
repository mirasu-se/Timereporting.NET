namespace Timereporting.Interaction.DTO
{
    public class TimereportDto
    {
        public int Id { get; set; }

        public int TypeId { get; set; }

        public Guid UserUUID { get; set; }

        public Guid TimeReportUUID { get; set; }

        public Guid WorkplaceUUID { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string ImageFileName { get; set; }

        public string ImageFilePath { get; set; }

        public string ImageFileContentType { get; set; }

        public byte[] ImageFileData { get; set; }

        public decimal? TimeStarted { get; set; }

        public decimal? TimeEnded { get; set; }

        public decimal? TotalHours { get; set; }

        public bool? IsOpened { get; set; }

        public DateTime? TimeOpened { get; set; }

        public bool? IsClosed { get; set; }

        public DateTime? TimeClosed { get; set; }

        public Guid UserCreated { get; set; }

        public DateTime TimeCreated { get; set; }

        public DateTime? LastTimeUpdated { get; set; }

        public Guid? UserUpdated { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime? TimeDeleted { get; set; }

        public Guid? UserDeleted { get; set; }
    }
}
