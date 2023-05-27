using Microsoft.AspNetCore.Mvc;

namespace Timereporting.Web.Controllers
{
    public class DocumentationController : Controller
    {
        public IActionResult ApiDocumentation()
        {
            return View();
        }

        public IActionResult DatabaseWorks()
        {
            return View();
        }

        public IActionResult DockerCompose()
        {
            return View();
        }

        public IActionResult MetadataInjection()
        {
            return View();
        }

        public IActionResult PerformanceOptimization()
        {
            return View();
        }

        public IActionResult WebpackBundling()
        {
            return View();
        }
    }
}