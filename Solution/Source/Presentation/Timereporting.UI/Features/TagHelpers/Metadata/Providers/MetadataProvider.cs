using Timereporting.UI.Features.TagHelpers.Metadata.Models;

namespace Timereporting.UI.Features.TagHelpers.Metadata.Providers
{
    public class MetadataProvider
    {
        public static HeaderMetadataElement GetAppMetadata()
        {
            return new HeaderMetadataElement
            {
                CharSet = "utf-8",
                PhoneNumberFormatDetection = "no",
                ApplicationName = "DSTX Timereporting",
                ApplicationDescription = "ASP .Net Core 7 - MVC Web App",
                ApplicatioManifestUrl = "/manifest.json",
                AndroidCapable = "yes",
                AppleCapable = "yes",
                AppleTitle = "DSTX AB | DSTX Timereporting",
                MicrosoftUrl = "/",
                ThemeColor = "#DD2743",
                ViewPort = "width=device-width, initial-scale=1, shrink-to-fit=no",
                Authors = "DSTX AB Team",
                Keywords = { "timereporting", "web app", "ASP .Net Core", "MVC", "DSTX" },
                Copyright = "DSTX AB"
            };
        }

        public static OpenGraphDefaultImage GetOpenGraphDefaultData()
        {
            return new OpenGraphDefaultImage
            {
                Title = "DSTX AB | DSTX Timereporting",
                Type = "ASP .Net Core 7 - MVC Web App",
                Name = "DSTX AB Team",
                Description = "DSTX Timereporting web application",
                Url = "https://example.com/login",
                Image = "https://example.com/img/open-graph-image.png",
                ImageSecureUrl = "https://cdn-provider.com/img/open-graph-image.png",
                ImageAlt = "DSTX AB Login",
                ImageWidth = "1200",
                ImageHeight = "630",
                ImageType = "image/png"
            };
        }

        public static OpenGraphTwitterImage GetOpenGraphTwitterData()
        {
            return new OpenGraphTwitterImage
            {
                Card = "summary",
                Title = "DSTX AB | DSTX Timereporting",
                Description = "DSTX Timereporting web application",
                Image = "https://example.com/images/login.png"
            };
        }

        public static IEnumerable<AndroidIconModel> GetFavicons()
        {
            return new List<AndroidIconModel>
            {
                new AndroidIconModel { RelationValue = "icon", TypeValue = "image/png", SizeValue = "96x96", UrlPathValue = "/favicon-96x96.png" },
                new AndroidIconModel { RelationValue = "icon", TypeValue = "image/png", SizeValue = "64x64", UrlPathValue = "/favicon-64x64.png" },
                new AndroidIconModel { RelationValue = "icon", TypeValue = "image/png", SizeValue = "32x32", UrlPathValue = "/favicon-32x32.png" }
            };
        }

        public static IEnumerable<AppleIconModel> GetAppleIcons()
        {
            return new List<AppleIconModel>
            {
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "180x180", UrlPathValue = "/favicon/apple/apple-touch-icon-180x180.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "152x152", UrlPathValue = "/favicon/apple/apple-touch-icon-152x152.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "144x144", UrlPathValue = "/favicon/apple/apple-touch-icon-144x144.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "120x120", UrlPathValue = "/favicon/apple/apple-touch-icon-120x120.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "114x114", UrlPathValue = "/favicon/apple/apple-touch-icon-114x114.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "76x76", UrlPathValue = "/favicon/apple/apple-touch-icon-76x76.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "72x72", UrlPathValue = "/favicon/apple/apple-touch-icon-72x72.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "60x60", UrlPathValue = "/favicon/apple/apple-touch-icon-60x60.png" },
                new AppleIconModel { RelationValue = "apple-touch-icon", SizeValue = "57x57", UrlPathValue = "/favicon/apple/apple-touch-icon-57x57.png" }
            };
        }
    }
}