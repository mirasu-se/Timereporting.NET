using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Web.Configuration;
using Timereporting.Web.ViewModel.Timereport;

namespace Timereporting.Web.Controllers
{
    public class TimeReportController : Controller
    {
        private readonly ILogger<TimeReportController> _logger;
        private readonly IOptions<AppConfig> _appConfig;

        public TimeReportController(ILogger<TimeReportController> logger, IOptions<AppConfig> appConfig)
        {
            _logger = logger;
            _appConfig = appConfig;
        }

        public async Task<IActionResult> PreviewTimeReport()
        {
            try
            {
                var viewModel = new TimereportPreviewModel
                {
                    Workplaces = Enumerable.Empty<WorkplaceDataModel>(), 
                    Timereports = Enumerable.Empty<TimereportDataModel>(), 
                    ReportDetails = null 
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving data.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet]
        public async Task<IActionResult> CreateTimereport()
        {
            try
            {
                var viewModel = new CreateTimereportFormModel
                {
                    Workplaces = Enumerable.Empty<WorkplaceDataModel>(),
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving data.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}