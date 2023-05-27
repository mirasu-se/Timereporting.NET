namespace Timereporting.Web.Configuration
{
    public class FileHostingOptions
    {
        public string FileHostingUrl { get; set; } = "http://localhost:5000";
        public string? TimereportFileDirectory { get; set; } = "~/Resources/Workplace";
        public string? WorkplaceFileDirectory { get; set; } = "~/Resources/Workplace";
    }
}
