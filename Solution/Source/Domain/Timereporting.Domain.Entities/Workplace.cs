namespace Timereporting.Domain.Entities
{
    public class Workplace
    {
        public int Id { get; set; }

        public Guid WorkplaceId { get; set; }

        public string Name { get; set; }

        public DateTime CreatedTime { get; set; }

        public string? Info { get; set; }

        public string? ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }
    }
}