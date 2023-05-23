using Microsoft.AspNetCore.Mvc;

namespace Timereporting.Web.Controllers
{
    public class TimeReportController : Controller
    {
        public IActionResult CreateTimeReport()
        {
            return View();
        }

        public IActionResult PreviewTimeReport()
        {
            return View();
        }
    }
}
