namespace Timereporting.Domain.Entities
{
    public class Timereport
    {
        public int Id { get; set; }

        public int WorkplaceId { get; set; }

        public DateTime Date { get; set; }

        public decimal Hours { get; set; }

        public string Info { get; set; }

        public string ImageUrl { get; set; }

        public byte[] ImageData { get; set; }
    }
}