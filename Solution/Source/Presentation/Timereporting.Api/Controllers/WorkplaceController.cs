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

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkplaceRequestModel>> GetWorkplace(int id)
        {
            try
            {
                var workplace = await _workplaceService.GetWorkplaceByIdAsync(id);

                if (workplace == null)
                    return NotFound();

                var workplaceModel = _mapper.Map<WorkplaceRequestModel>(workplace);
                return Ok(workplaceModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving workplace with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkplace([FromForm] WorkplaceRequestModel formModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var dataModel = new WorkplaceDataModel
                {
                    Id = formModel.Id,
                    Name = formModel.Name,
                    CreatedTime = DateTime.Now,
                    Info = formModel.Info,
                    ImageFile = formModel.ImageFile
                };

                await _workplaceService.CreateWorkplaceAsync(dataModel);

                var fileHostingOptions = _fileHostingOptions.Value;
                if (fileHostingOptions == null || string.IsNullOrEmpty(fileHostingOptions.WorkplaceFileDirectory))
                {
                    _logger.LogError("File hosting option is not specified.");
                    throw new Exception();
                }
                else
                {
                    var storageDirectory = fileHostingOptions.WorkplaceFileDirectory;
                    if (dataModel.ImageFile != null)
                    {
                        await _imageFileService.UploadImageAsync(dataModel.ImageFile, storageDirectory);
                    }
                }

                return Ok();
            }
            catch (Exception ex) 
            { 
            
                _logger.LogError(ex, "Error occurred while creating workplace.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        private IFormFile CreateFormFileWithNewName(IFormFile originalFile, string newFileName)
        {
            using (var stream = new MemoryStream())
            {
                originalFile.CopyTo(stream);
                stream.Position = 0;
                return new FormFile(stream, 0, stream.Length, originalFile.Name, newFileName);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkplace(int id)
        {
            try
            {
                await _workplaceService.DeleteWorkplaceAsync(id);

                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting workplace with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkplace(int id, WorkplaceRequestModel updatedWorkplace)
        {
            try
            {
                var existingWorkplace = await _workplaceService.GetWorkplaceByIdAsync(id);

                if (existingWorkplace == null)
                    return NotFound();

                existingWorkplace.Name = updatedWorkplace.Name;
                existingWorkplace.CreatedTime = updatedWorkplace.CreatedTime;
                existingWorkplace.Info = updatedWorkplace.Info;

                if (updatedWorkplace.ImageFile != null)
                {
                    var storageDirectory = "/Resources/Images/Workplace";
                    var fileName = await _imageFileService.UploadImageAsync(updatedWorkplace.ImageFile, storageDirectory);
                }

                await _workplaceService.UpdateWorkplaceAsync(id, existingWorkplace);

                var updatedWorkplaceModel = _mapper.Map<WorkplaceRequestModel>(existingWorkplace);
                return Ok(updatedWorkplaceModel);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating workplace with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("{id}/image")]
        public async Task<IActionResult> UploadImage(int id, IFormFile imageFile)
        {
            try
            {
                var workplace = await _workplaceService.GetWorkplaceByIdAsync(id);
                if (workplace == null)
                    return NotFound();

                var storageDirectory = "/Resources/Images/Workplace";

                var fileName = await _imageFileService.UploadImageAsync(imageFile, storageDirectory);

                // Update the workplace with the image filename and save changes
                await _workplaceService.UpdateWorkplaceAsync(id, workplace);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while uploading image for workplace with ID {id}.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}