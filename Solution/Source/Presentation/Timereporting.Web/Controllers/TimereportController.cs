using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Web.ViewModel.Timereport;

namespace Timereporting.Web.Controllers
{
    public class TimeReportController : Controller
    {
        private readonly ILogger<TimeReportController> _logger;

        public TimeReportController(ILogger<TimeReportController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> PreviewTimeReport()
        {
            try
            {
                using HttpClient httpClient = new();

                // Call the API to get workplaces
                var workplaceResponse = await httpClient.GetAsync("http://timereporting.api/api/v1/workplace");
                var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();
                var workplaceModels = JsonConvert.DeserializeObject<IEnumerable<WorkplaceDataModel>>(workplaceContent);

                // Call the API to get timereports
                var timereportResponse = await httpClient.GetAsync("http://timereporting.api/api/v1/timereport");
                var timereportContent = await timereportResponse.Content.ReadAsStringAsync();
                var timereportModels = JsonConvert.DeserializeObject<IEnumerable<TimereportDataModel>>(timereportContent);

                // Sort the timereportModels by ID in ascending order
                timereportModels = timereportModels.OrderBy(report => report.Id);

                // Create the view model and populate the data
                var viewModel = new TimereportPreviewModel
                {
                    Workplaces = workplaceModels,
                    Timereports = timereportModels ?? Enumerable.Empty<TimereportDataModel>(), // Use an empty list if timereportModels is null
                    ReportDetails = null // Set initial value to null
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
            using HttpClient httpClient = new();

            // Call the API to get workplaces
            var workplaceResponse = await httpClient.GetAsync("http://timereporting.api/api/v1/workplace");
            var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();
            var workplaceModels = JsonConvert.DeserializeObject<IEnumerable<WorkplaceDataModel>>(workplaceContent);

            var viewModel = new CreateTimereportFormModel
            {
                Workplaces = workplaceModels
            };

            return View(viewModel);
        }
    }
}