using Microsoft.AspNetCore.Routing;
using System.Text.RegularExpressions;

namespace Timereporting.Infrastructure.TagHelpers.Routing.Transformers
{
    public class UrlSlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            if (value == null) { return null; }

            // Slugify value
            return Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower();
        }
    }
}
