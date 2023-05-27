namespace Timereporting.Domain.Entities
{
    public class Workplace
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreatedTime { get; set; }

        public string Info { get; set; }
    }
}