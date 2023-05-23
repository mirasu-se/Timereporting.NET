using System.Collections.Generic;

namespace Timereporting.Infrastructure.Configuration.FileSystem.Models.HTML.Element
{
    public class AppHeaderMetadata
    {
        public string CharSet { get; set; }
        public string PhoneNumberFormatDetection { get; set; }
        public string ApplicationName { get; set; }
        public string ApplicationDescription { get; set; }
        public string ApplicatioManifestUrl { get; set; }
        public string AndroidCapable { get; set; }
        public string AppleCapable { get; set; }
        public string AppleTitle { get; set; }
        public string MicrosoftUrl { get; set; }
        public string ThemeColor { get; set; }
        public string ViewPort { get; set; }
        public string Authors { get; set; }
        public List<string> Keywords { get; } = new List<string>();
        public string Copyright { get; set; }
    }
}