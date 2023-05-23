using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Linq;
using System.Text;
using Timereporting.Infrastructure.TagHelpers.Metadata.Repositories;

namespace Timereporting.Infrastructure.TagHelpers.Metadata.Services
{
    public class MetadataBuildingService : TagHelperComponent
    {
        public static string BuildWindowsBrowserCompatibilityMetaTag()
        {
            string metaTag = "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">";
            return metaTag;
        }

        public static string BuildApplicationManifestMetaTag()
        {
            string manifestUrl = MetadataRepository.GetAppMetadata().ApplicatioManifestUrl.ToString();
            manifestUrl = "<link rel=\"manifest\" href=\"" + manifestUrl + "\">";
            return manifestUrl;
        }

        public static string BuildApplicationMetaTag(string nameValue, string contentValue)
        {
            string metaTag = "<meta name=\"" + nameValue + "\" " + "content=\"" + contentValue + "\">\r\n";
            return metaTag;
        }

        public static string BuildOpenGraphDefaultMetaTag(string propertyValue, string contentValue)
        {
            string metaTag = "<meta property=\"" + propertyValue + "\" " + "content=\"" + contentValue + "\">\r\n";
            return metaTag;
        }

        public static string BuildOpenGraphTwitterMetaTag(string nameValue, string contentValue)
        {
            string metaTag = "<meta name=\"" + nameValue + "\" " + "content=\"" + contentValue + "\">\r\n";
            return metaTag;
        }


        public static string BuildAppleIconMetaLink(string rel, string sizes, string href)
        {
            string metaLink = "<link rel=\"" + rel + "\" " + "sizes=\"" + sizes + "\" " + "href=\"" + href + "\">\r\n";
            return metaLink;
        }

        public static string BuildFaviconMetaLink(string rel, string type, string sizes, string href)
        {
            string metaLink = "<link rel=\"" + rel + "\" " + "type=\"" + type + "\" " + "sizes=\"" + sizes + "\" " + "href=\"" + href + "\">\r\n";
            return metaLink;
        }

        public static string BuildAppTitleTag()
        {
            string appTitle = MetadataRepository.GetOpenGraphDefaultData().Title.ToString();
            string appTitleTag = "<title>" + appTitle + "</title>";
            return appTitleTag;
        }

        public static string GenerateApplicationMetaTags()
        {
            StringBuilder metaString = new();
            var applicationMetadata = MetadataRepository.GetAppMetadata();
            metaString.Append(
                BuildWindowsBrowserCompatibilityMetaTag() +
                BuildApplicationMetaTag("charset", applicationMetadata.CharSet) +
                BuildApplicationMetaTag("application-name", applicationMetadata.ApplicationName) +
                BuildApplicationMetaTag("description", applicationMetadata.ApplicationDescription) +
                BuildApplicationMetaTag("mobile-web-app-capable", applicationMetadata.AndroidCapable) +
                BuildApplicationMetaTag("apple-mobile-web-app-capable", applicationMetadata.AppleCapable) +
                BuildApplicationMetaTag("apple-mobile-web-app-title", applicationMetadata.AppleTitle) +
                BuildApplicationMetaTag("msapplication-starturl", applicationMetadata.MicrosoftUrl) +
                BuildApplicationMetaTag("theme-color", applicationMetadata.ThemeColor) +
                BuildApplicationMetaTag("keywords", string.Join(", ", applicationMetadata.Keywords)) +
                BuildApplicationMetaTag("authors", applicationMetadata.Authors) +
                BuildApplicationMetaTag("copyright", applicationMetadata.Copyright) +
                BuildApplicationMetaTag("viewport", applicationMetadata.ViewPort)
                );
            return metaString.ToString();
        }

        public static string GenerateAppleIconMetaLinks()
        {
            StringBuilder metaString = new();
            var appleIcons = MetadataRepository.GetAppleIcons();
            foreach (var icon in appleIcons)
            {
                metaString.Append(BuildAppleIconMetaLink(icon.RelationValue, icon.SizeValue, icon.UrlPathValue));
            }
            return metaString.ToString();
        }

        public static string GenerateFaviconMetaLinks()
        {
            StringBuilder metaString = new();
            var androidIcons = MetadataRepository.GetFavicons();
            foreach (var icon in androidIcons)
            {
                metaString.Append(BuildFaviconMetaLink(icon.RelationValue, icon.TypeValue, icon.SizeValue, icon.UrlPathValue));
            }
            return metaString.ToString();
        }

        public static string GenerateOpenGraphDefaultMetaTags()
        {
            StringBuilder metaString = new();
            var openGraphDefaultData = MetadataRepository.GetOpenGraphDefaultData();
            metaString.Append(
                BuildOpenGraphDefaultMetaTag("og:title", openGraphDefaultData.Title) +
                BuildOpenGraphDefaultMetaTag("og:type", openGraphDefaultData.Type) +
                BuildOpenGraphDefaultMetaTag("og:site_name", openGraphDefaultData.Name) +
                BuildOpenGraphDefaultMetaTag("og:description", openGraphDefaultData.Description) +
                BuildOpenGraphDefaultMetaTag("og:url", openGraphDefaultData.Url) +
                BuildOpenGraphDefaultMetaTag("og:image", openGraphDefaultData.Image) +
                BuildOpenGraphDefaultMetaTag("og:image:secure_url", openGraphDefaultData.ImageSecureUrl) +
                BuildOpenGraphDefaultMetaTag("og:image:alt", openGraphDefaultData.ImageAlt) +
                BuildOpenGraphDefaultMetaTag("og:image:width", openGraphDefaultData.ImageWidth) +
                BuildOpenGraphDefaultMetaTag("og:image:height", openGraphDefaultData.ImageHeight) +
                BuildOpenGraphDefaultMetaTag("og:image:type", openGraphDefaultData.ImageType)
                );
            return metaString.ToString();
        }

        public static string GenerateOpenGraphTwitterMetaTags()
        {
            StringBuilder metaString = new();
            var openGraphTwitterData = MetadataRepository.GetOpenGraphTwitterData();
            metaString.Append(
                BuildOpenGraphTwitterMetaTag("twitter:card", openGraphTwitterData.Card) +
                BuildOpenGraphTwitterMetaTag("twitter:title", openGraphTwitterData.Title) +
                BuildOpenGraphTwitterMetaTag("twitter:description", openGraphTwitterData.Description) +
                BuildOpenGraphTwitterMetaTag("twitter:image", openGraphTwitterData.Image)
                );
            return metaString.ToString();
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            if (string.Equals(context.TagName, "head", StringComparison.OrdinalIgnoreCase))
            {
                output.PreContent.AppendHtml(GenerateApplicationMetaTags());
                output.PreContent.AppendHtml(GenerateOpenGraphDefaultMetaTags());
                output.PreContent.AppendHtml(GenerateOpenGraphTwitterMetaTags());
                output.PreContent.AppendHtml(GenerateAppleIconMetaLinks());
                output.PreContent.AppendHtml(GenerateFaviconMetaLinks());
                output.PreContent.AppendHtml(BuildApplicationManifestMetaTag());
                output.PreContent.AppendHtml(BuildAppTitleTag());
            }
        }
    }
}
