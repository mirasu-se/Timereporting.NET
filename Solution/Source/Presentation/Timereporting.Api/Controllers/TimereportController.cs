using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Mysqlx.Crud;
using OpenQA.Selenium;
using Timereporting.Api.Configuration;
using Timereporting.Application.Services;
using Timereporting.Domain.Entities;
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
           [FromQuery(Name = "workplace")] Guid workplaceId,
           [FromQuery(Name = "from_date")] DateTime? fromDate,
           [FromQuery(Name = "to_date")] DateTime? toDate)
        {
            try
            {
                IEnumerable<TimereportDataModel> timereports = null;

                switch (workplaceId)
                {
                    case Guid guid when guid == Guid.Parse("00000000-0000-0000-0000-000000000000"):
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
                                timereports = new List<TimereportDataModel> { new TimereportDataModel { Id = 0, Info = "From date can't be larger than to date!" } };
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
                                timereports = new List<TimereportDataModel> { new TimereportDataModel { Id = 0, Info = "From date can't be larger than to date!" } };
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

        [HttpGet("{timereportId}")]
        public async Task<ActionResult<TimereportRequestModel>> GetTimereport(Guid timereportId)
        {
            try
            {
                var timereport = await _timereportService.GetTimereportByIdAsync(timereportId);

                if (timereport == null)
                    return NotFound();

                var timereportModel = _mapper.Map<TimereportRequestModel>(timereport);
                return Ok(timereportModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with timereportId {timereportId}.");
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
                    WorkplaceId = formModel.WorkplaceId,
                    TimereportId = Guid.NewGuid(),
                    Date = formModel.Date,
                    Hours = formModel.Hours,
                    Info = formModel.Info,
                    ImageFile = formModel.ImageFile
                };

                if (dataModel.ImageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.TimereportFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or TimereportFileDirectory is null or empty.");
                        throw new Exception();
                    }

                    await _imageFileService.UploadTimereportImageAsync(dataModel.ImageFile, Path.Combine("wwwroot", fileHostingOptions.TimereportFileDirectory), dataModel.TimereportId);
                }

                await _timereportService.CreateTimereportAsync(dataModel);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating timereport.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpPut("{timereportId}")]
        public async Task<IActionResult> UpdateTimereport(Guid timereportId, TimereportRequestModel dataModel)
        {
            try
            {
                var existingTimereport = await _timereportService.GetTimereportByIdAsync(timereportId);

                if (existingTimereport == null)
                    return NotFound();

                _mapper.Map(dataModel, existingTimereport);

                if (dataModel.ImageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.TimereportFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or TimereportFileDirectory is null or empty.");
                        throw new Exception();
                    }

                    await _imageFileService.UploadTimereportImageAsync(dataModel.ImageFile, fileHostingOptions.TimereportFileDirectory, timereportId);
                }

                await _timereportService.UpdateTimereportAsync(timereportId, existingTimereport);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating timereport with timereportId {timereportId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpDelete("{timereportId}")]
        public async Task<IActionResult> DeleteTimereport(Guid timereportId)
        {
            try
            {
                await _timereportService.DeleteTimereportAsync(timereportId);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting Timereport with timereportId {timereportId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("{timereportId}/image")]
        public async Task<IActionResult> UploadImage(Guid timereportId, IFormFile imageFile)
        {
            try
            {
                var timereport = await _timereportService.GetTimereportByIdAsync(timereportId);
                if (timereport == null)
                {
                    return NotFound();
                }

                if (imageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.TimereportFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or TimereportFileDirectory is null or empty.");
                        throw new Exception();
                    }
                    await _imageFileService.UploadTimereportImageAsync(imageFile, fileHostingOptions.TimereportFileDirectory, timereportId);
                }

                await _timereportService.UpdateTimereportAsync(timereportId, timereport);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while uploading image for timereport with timereportId {timereportId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}