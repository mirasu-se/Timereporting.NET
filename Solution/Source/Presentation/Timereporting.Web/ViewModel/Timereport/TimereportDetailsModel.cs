namespace Timereporting.Web.ViewModel.Timereport
{
    public class TimereportDetailsModel
    {
        public int Id { get; set; }
        public int WorkplaceId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public double Hours { get; set; }
        public string Info { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
