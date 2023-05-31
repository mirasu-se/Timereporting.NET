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
                using HttpClient httpClient = new();

                // Set the authorization header
                httpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {_appConfig.Value.ApiAuthorizationKey}");

                // Call the API to get workplaces
                var workplaceResponse = await httpClient.GetAsync("https://arbetsprov.trinax.se/api/v1/workplace");
                var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();
                var workplaceData = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(workplaceContent);

                // Create the view model and populate the data
                var viewModel = new TimereportPreviewModel
                {
                    Workplaces = workplaceData != null
                        ? workplaceData.Select(workplace => new WorkplaceDataModel
                        {
                            Id = (int)workplace.id,
                            Name = (string)workplace.name,
                            CreatedTime = DateTime.Parse((string)workplace.created_time)
                        })
                        : Enumerable.Empty<WorkplaceDataModel>(), // Use an empty list if workplaceData is null
                    Timereports = Enumerable.Empty<TimereportDataModel>(), // Use an empty list for timereports
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
            try
            {
                using HttpClient httpClient = new();

                // Set the authorization header
                httpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {_appConfig.Value.ApiAuthorizationKey}");

                // Call the API to get workplaces
                var workplaceResponse = await httpClient.GetAsync("https://arbetsprov.trinax.se/api/v1/workplace");
                var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();
                var workplaceModels = JsonConvert.DeserializeObject<IEnumerable<WorkplaceDataModel>>(workplaceContent);

                var viewModel = new CreateTimereportFormModel
                {
                    Workplaces = workplaceModels
                };

                return View(viewModel);
            }
            catch
            {
                // Handle exceptions
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}