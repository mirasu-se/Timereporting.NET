namespace Timereporting.Api.Models
{
    public class WorkplaceModel
    {
        public int Id { get; set; }

        public Guid WorkplaceUUID { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string ImageFileName { get; set; }

        public string ImageFilePath { get; set; }

        public string ImageFileContentType { get; set; }

        public byte[] ImageFileData { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? ZipCode { get; set; }

        public Guid UserCreated { get; set; }

        public DateTime TimeCreated { get; set; }

        public DateTime? LastTimeUpdated { get; set; }

        public Guid? UserUpdated { get; set; }

        public bool? IsDeleted { get; set; }

        public DateTime? TimeDeleted { get; set; }

        public Guid? UserDeleted { get; set; }
    }
}
