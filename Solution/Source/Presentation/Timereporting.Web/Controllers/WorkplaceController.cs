using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Web.Configuration;
using Timereporting.Web.ViewModel.Workplace;

namespace Timereporting.Web.Controllers
{
    public class WorkplaceController : Controller
    {
        private readonly ILogger<TimeReportController> _logger;
        private readonly IOptions<AppConfig> _appConfig;

        public WorkplaceController(ILogger<TimeReportController> logger, IOptions<AppConfig> appConfig)
        {
            _logger = logger;
            _appConfig = appConfig;
        }

        public async Task<IActionResult> PreviewWorkplace()
        {
            try
            {
                using HttpClient httpClient = new();

                // Set the authorization header
                httpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {_appConfig.Value.ApiAuthorizationKey}");

                // Call the API to get workplaces
                var workplaceResponse = await httpClient.GetAsync("https://arbetsprov.trinax.se/api/v1/workplace");
                var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();

                // Deserialize the API response into a list of dynamic objects
                var workplaceData = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(workplaceContent);

                if (workplaceData != null)
                {
                    // Create the view model and populate the data
                    var viewModel = new WorkplacePreviewModel
                    {
                        Workplaces = workplaceData.Select(workplace => new WorkplaceDataModel
                        {
                            Id = (int)workplace.id,
                            Name = (string)workplace.name,
                            CreatedTime = DateTime.Parse((string)workplace.created_time),
                        })
                    };

                    return View(viewModel);
                }

                // Handle the case when workplaceData is null (or empty) here if needed
            }
            catch (Exception ex)
            {
                // Handle exceptions
                _logger.LogError(ex, "Error occurred while retrieving data.");
                return StatusCode(500, "An error occurred while processing your request.");
            }

            // Default return statement (return an appropriate IActionResult)
            return StatusCode(500, "An error occurred while processing your request.");
        }



        // GET: /timereport/create
        [HttpGet]
        public IActionResult CreateWorkplace()
        {
            var viewModel = new CreateWorkplaceFormModel();
            return View(viewModel);
        }
    }
}
