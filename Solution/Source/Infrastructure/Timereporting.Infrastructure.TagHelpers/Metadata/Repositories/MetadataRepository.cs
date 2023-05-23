using Timereporting.Infrastructure.Configuration.FileSystem.Models.HTML.Element;
using Timereporting.Infrastructure.Configuration.FileSystem.Models.HTML.Icon;
using Timereporting.Infrastructure.Configuration.FileSystem.Models.HTML.Image;

namespace Timereporting.Infrastructure.TagHelpers.Metadata.Repositories
{
    public class MetadataRepository
    {
        public static AppHeaderMetadata GetAppMetadata()
        {
            return new AppHeaderMetadata
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

        public static AppDefaultOpenGraphImage GetOpenGraphDefaultData()
        {
            return new AppDefaultOpenGraphImage
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

        public static AppOpenTwitterGraphImager GetOpenGraphTwitterData()
        {
            return new AppOpenTwitterGraphImager
            {
                Card = "summary",
                Title = "DSTX AB | DSTX Timereporting",
                Description = "DSTX Timereporting web application",
                Image = "https://example.com/images/login.png"
            };
        }

        public static IEnumerable<AppDefaultIcon> GetFavicons()
        {
            return new List<AppDefaultIcon>
            {
                new AppDefaultIcon { RelationValue = "icon", TypeValue = "image/png", SizeValue = "96x96", UrlPathValue = "/favicon-96x96.png" },
                new AppDefaultIcon { RelationValue = "icon", TypeValue = "image/png", SizeValue = "64x64", UrlPathValue = "/favicon-64x64.png" },
                new AppDefaultIcon { RelationValue = "icon", TypeValue = "image/png", SizeValue = "32x32", UrlPathValue = "/favicon-32x32.png" }
            };
        }



        public static IEnumerable<AppAppleIcon> GetAppleIcons()
        {
            return new List<AppAppleIcon>
            {
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "180x180", UrlPathValue = "/favicon/apple/apple-touch-icon-180x180.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "152x152", UrlPathValue = "/favicon/apple/apple-touch-icon-152x152.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "144x144", UrlPathValue = "/favicon/apple/apple-touch-icon-144x144.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "120x120", UrlPathValue = "/favicon/apple/apple-touch-icon-120x120.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "114x114", UrlPathValue = "/favicon/apple/apple-touch-icon-114x114.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "76x76", UrlPathValue = "/favicon/apple/apple-touch-icon-76x76.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "72x72", UrlPathValue = "/favicon/apple/apple-touch-icon-72x72.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "60x60", UrlPathValue = "/favicon/apple/apple-touch-icon-60x60.png" },
                new AppAppleIcon { RelationValue = "apple-touch-icon", SizeValue = "57x57", UrlPathValue = "/favicon/apple/apple-touch-icon-57x57.png" }
            };
        }

    }
}
