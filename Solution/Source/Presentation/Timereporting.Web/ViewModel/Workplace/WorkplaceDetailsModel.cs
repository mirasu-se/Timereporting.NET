namespace Timereporting.Web.ViewModel.Workplace
{
    public class WorkplaceDetailsModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Info { get; set; }

        public IFormFile? ImageFile { get; set; }

        public DateTime CreatedTime { get; set; }
    }
}
