using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using Timereporting.Interaction.DataTransfer.Models.Api;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Web.ViewModel.Timereport;
using Timereporting.Web.ViewModel.Workplace;

namespace Timereporting.Web.Controllers
{
    public class WorkplaceController : Controller
    {
        private readonly ILogger<WorkplaceController> _logger;

        public WorkplaceController(ILogger<WorkplaceController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> PreviewWorkplace()
        {
            try
            {
                using HttpClient httpClient = new();

                // Call the API to get workplaces
                var workplaceResponse = await httpClient.GetAsync("http://timereporting.api/api/v1/workplace");
                var workplaceContent = await workplaceResponse.Content.ReadAsStringAsync();
                var workplaceModels = JsonConvert.DeserializeObject<IEnumerable<WorkplaceDataModel>>(workplaceContent);

                // Create the view model and populate the data
                var viewModel = new WorkplacePreviewModel
                {
                    Workplaces = workplaceModels,
                    WorkplaceDetails = null // Set ReportDetails property to null or default values
                };

                return View(viewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving data.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
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
