using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OpenQA.Selenium;
using Timereporting.Api.Configuration;
using Timereporting.Application.Services;
using Timereporting.Interaction.DataTransfer.Models.Api;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Interaction.DataTransfer.Services.FileSystem.Images;

namespace Timereporting.Api.Controllers
{
    [ApiController]
    [Route("api/v1/workplace")]
    public class WorkplaceController : ControllerBase
    {
        private readonly ILogger<WorkplaceController> _logger;
        private readonly IMapper _mapper;
        private readonly IImageFileService _imageFileService;
        private readonly IOptions<FileHostingOptions> _fileHostingOptions;
        private readonly IWorkplaceService _workplaceService;

        public WorkplaceController(
            ILogger<WorkplaceController> logger,
            IMapper mapper,
            IImageFileService imageFileService,
            IOptions<FileHostingOptions> fileHostingOptions,
            IWorkplaceService workplaceService)
        {
            _logger = logger;
            _mapper = mapper;
            _imageFileService = imageFileService;
            _fileHostingOptions = fileHostingOptions;
            _workplaceService = workplaceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkplaceRequestModel>>> GetWorkplaces()
        {
            try
            {
                var workplaces = await _workplaceService.GetAllWorkplacesAsync();
                var workplaceModels = _mapper.Map<IEnumerable<WorkplaceRequestModel>>(workplaces);
                return Ok(workplaceModels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving workplaces.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("{workplaceId}")]
        public async Task<ActionResult<WorkplaceRequestModel>> GetWorkplace(Guid workplaceId)
        {
            try
            {
                var workplace = await _workplaceService.GetWorkplaceByIdAsync(workplaceId);

                if (workplace == null)
                    return NotFound();

                var workplaceModel = _mapper.Map<WorkplaceRequestModel>(workplace);
                return Ok(workplaceModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving workplace with workplaceId {workplaceId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkplace([FromForm] WorkplaceRequestModel formModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dataModel = new WorkplaceDataModel
                {
                    Id = formModel.Id,
                    WorkplaceId = Guid.NewGuid(),
                    Name = formModel.Name,
                    CreatedTime = DateTime.Now,
                    Info = formModel.Info,
                    ImageFile = formModel.ImageFile
                };

                if (dataModel.ImageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.WorkplaceFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or WorkplaceFileDirectory is null or empty.");
                        throw new Exception();
                    }

                    await _imageFileService.UploadWorkplaceImageAsync(dataModel.ImageFile, fileHostingOptions.WorkplaceFileDirectory, dataModel.WorkplaceId);
                }

                await _workplaceService.CreateWorkplaceAsync(dataModel);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating workplace.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("{workplaceId}")]
        public async Task<IActionResult> DeleteWorkplace(Guid workplaceId)
        {
            try
            {
                await _workplaceService.DeleteWorkplaceAsync(workplaceId);

                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting workplace with workplaceId {workplaceId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpPut("{workplaceId}")]
        public async Task<IActionResult> UpdateWorkplace(Guid workplaceId, WorkplaceRequestModel updatedWorkplace)
        {
            try
            {
                var existingWorkplace = await _workplaceService.GetWorkplaceByIdAsync(workplaceId);

                if (existingWorkplace == null)
                {
                    return NotFound();
                }

                var updatedWorkplaceModel = _mapper.Map<WorkplaceRequestModel>(existingWorkplace);

                if (updatedWorkplace.ImageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.WorkplaceFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or WorkplaceFileDirectory is null or empty.");
                        throw new Exception();
                    }

                    await _imageFileService.UploadWorkplaceImageAsync(updatedWorkplace.ImageFile, fileHostingOptions.WorkplaceFileDirectory, workplaceId);
                }

                await _workplaceService.UpdateWorkplaceAsync(workplaceId, existingWorkplace);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating workplace with workplaceId {workplaceId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("{workplaceId}/image")]
        public async Task<IActionResult> UploadImage(Guid workplaceId, IFormFile imageFile)
        {
            try
            {
                var workplace = await _workplaceService.GetWorkplaceByIdAsync(workplaceId);

                if (workplace == null)
                {
                    return NotFound();
                }

                if (imageFile != null)
                {
                    var fileHostingOptions = _fileHostingOptions.Value;

                    if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.WorkplaceFileDirectory))
                    {
                        _logger.LogError("File hosting option is not specified or WorkplaceFileDirectory is null or empty.");
                        throw new Exception();
                    }

                    await _imageFileService.UploadWorkplaceImageAsync(imageFile, fileHostingOptions.WorkplaceFileDirectory, workplaceId);
                }

                await _workplaceService.UpdateWorkplaceAsync(workplaceId, workplace);
                return Ok();
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while uploading image for workplace with workplaceId {workplaceId}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}