using Microsoft.AspNetCore.Mvc;

namespace Timereporting.Web.Controllers
{
    public class WorkplaceController : Controller
    {
        public IActionResult CreateWorkplace()
        {
            return View();
        }

        public IActionResult PreviewWorkplace()
        {
            return View();
        }
    }
}
