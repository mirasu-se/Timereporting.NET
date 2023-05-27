using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OpenQA.Selenium;
using Timereporting.Api.Configuration;
using Timereporting.Application.Services;
using Timereporting.Interaction.DataTransfer.Models.Api;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Interaction.DataTransfer.Services.FileSystem.Images;

namespace Timereporting.Controllers
{
    [ApiController]
    [Route("api/v1/timereport")]
    public class TimereportsController : ControllerBase
    {
        private readonly ILogger<TimereportsController> _logger;
        private readonly IMapper _mapper;
        private readonly IImageFileService _imageFileService;
        private readonly IOptions<FileHostingOptions> _fileHostingOptions;
        private readonly ITimereportService _timereportService;

        public TimereportsController(
            ILogger<TimereportsController> logger,
            IMapper mapper,
            IImageFileService imageFileService,
            IOptions<FileHostingOptions> fileHostingOptions,
            ITimereportService timereportService)
        {
            _logger = logger;
            _mapper = mapper;
            _imageFileService = imageFileService;
            _fileHostingOptions = fileHostingOptions;
            _timereportService = timereportService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimereportDataModel>>> GetTimereports(
           [FromQuery(Name = "workplace")] int workplaceId,
           [FromQuery(Name = "from_date")] DateTime? fromDate,
           [FromQuery(Name = "to_date")] DateTime? toDate)
        {
            try
            {
                IEnumerable<TimereportDataModel> timereports = null;

                switch (workplaceId)
                {
                    case 0:
                        if (fromDate == null && toDate == null)
                        {
                            timereports = await _timereportService.GetAllTimereportsAsync();

                            if (timereports == null)
                                return NotFound("No timereports found for the specified workplace.");
                        }
                        if (fromDate == null && toDate != null)
                        {
                            timereports = await _timereportService.GetTimereportsByEndDateForAllWorkplacesAsync(toDate.Value);
                        }
                        if (fromDate != null && toDate == null)
                        {
                            timereports = await _timereportService.GetTimereportsByStartDateForAllWorkplacesAsync(fromDate.Value);
                        }
                        if (fromDate != null && toDate != null)
                        {
                            if (fromDate > toDate)
                            {
                                timereports = new List<TimereportDataModel> { new TimereportDataModel { Id = 0, Name = "Invalid date range. 'From Date' cannot be after 'To Date'." } };
                            }
                            else
                            {
                                timereports = await _timereportService.GetTimereportsBetweenDatesForAllWorkplacesAsync(fromDate.Value, toDate.Value);
                            }
                        }
                        break;

                    default:
                        if (fromDate == null && toDate == null)
                        {
                            timereports = await _timereportService.GetTimereportsByWorkplaceAsync(workplaceId);
                        }
                        if (fromDate == null && toDate != null)
                        {
                            timereports = await _timereportService.GetTimereportsByEndDateAsync(workplaceId, toDate.Value);
                        }
                        if (fromDate != null && toDate == null)
                        {
                            timereports = await _timereportService.GetTimereportsByStartDateAsync(workplaceId, fromDate.Value);
                        }
                        if (fromDate != null && toDate != null)
                        {
                            if (fromDate > toDate)
                            {
                                timereports = new List<TimereportDataModel> { new TimereportDataModel { Id = 9, Name = "Invalid date range. 'From Date' cannot be after 'To Date'." } };
                            }
                            else
                            {
                                timereports = await _timereportService.GetTimereportsBetweenDatesAsync(workplaceId, fromDate.Value, toDate.Value);
                            }
                        }
                        break;
                }

                if (timereports == null)
                    return NoContent();

                return Ok(timereports);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving timereports.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TimereportRequestModel>> GetTimereport(int id)
        {
            try
            {
                var timereport = await _timereportService.GetTimereportByIdAsync(id);

                if (timereport == null)
                    return NotFound();

                var timereportModel = _mapper.Map<TimereportRequestModel>(timereport);
                return Ok(timereportModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTimereport([FromForm] TimereportRequestModel formModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var dataModel = new TimereportDataModel
                {
                    Id = formModel.Id,
                    WorkplaceId = formModel.WorkplaceId,
                    Name = formModel.Name,
                    Date = DateTime.Now,
                    Hours = formModel.Hours,
                    Info = formModel.Info,
                    ImageFile = formModel.ImageFile
                };

                var timereport = await _timereportService.GetTimereportByIdAsync(dataModel.Id);
                if (timereport == null) return null;

                var fileHostingOptions = _fileHostingOptions.Value;
                if (fileHostingOptions == null)
                {
                    LogAndThrowError("File hosting option is not specified.");
                    throw new Exception();
                }

                var storageDirectory = "/Resources/Images/Timereport";

                var fileName = await _imageFileService.UploadImageAsync(dataModel.ImageFile, storageDirectory);

                await _timereportService.CreateTimereportAsync(dataModel);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating workplace.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTimereport(int id, TimereportRequestModel requestModel)
        {
            try
            {
                var existingTimereport = await _timereportService.GetTimereportByIdAsync(id);

                if (existingTimereport == null)
                    return NotFound();

                existingTimereport.Id = requestModel.Id;
                existingTimereport.Date = requestModel.Date;
                existingTimereport.Hours = requestModel.Hours;
                existingTimereport.Info = requestModel.Info;

                await _timereportService.UpdateTimereportAsync(id, existingTimereport);

                var response = _mapper.Map<TimereportResponseModel>(existingTimereport);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating timereport with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimereport(int id)
        {
            try
            {
                await _timereportService.DeleteTimereportAsync(id);

                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting Timereport with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("{id}/image")]
        public async Task<IActionResult> UploadImage(int id, IFormFile file)
        {
            try
            {
                var fileName = await UploadTimereportImage(id, file);

                if (fileName == null)
                    return NotFound();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while uploading image for timereport with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        private async Task<string?> UploadTimereportImage(int id, IFormFile imageFile)
        {
            var timereport = await _timereportService.GetTimereportByIdAsync(id);
            if (timereport == null)  return null;

            var fileHostingOptions = _fileHostingOptions.Value;
            if (fileHostingOptions == null)
            {
                LogAndThrowError("File hosting option is not specified.");
                throw new Exception();
            }

            var storageDirectory = "/Resources/Images/Timereport";

            var fileName = await _imageFileService.UploadImageAsync(imageFile, storageDirectory);

            // Update the timereport with the image filename and save changes
            await _timereportService.UpdateTimereportAsync(id, timereport);

            return fileName;
        }

        private void LogAndThrowError(string errorMessage)
        {
            _logger.LogError(message: errorMessage);
            throw new Exception(message: errorMessage);
        }
    }
}