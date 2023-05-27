using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using OpenQA.Selenium;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Infrastructure.Repositories;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Interaction.DataTransfer.Services.FileSystem.Images;

namespace Timereporting.Application.Services
{
    public class WorkplaceService : IWorkplaceService
    {
        private readonly ILogger<WorkplaceService> _logger;
        private readonly IWorkplaceRepository _workplaceRepository;
        private readonly IImageFileService _imageService;
        private readonly IMapper _mapper;

        public WorkplaceService(
            ILogger<WorkplaceService> logger,
            IWorkplaceRepository workplaceRepository,
            IImageFileService imageService,
            IMapper mapper)
        {
            _logger = logger;
            _workplaceRepository = workplaceRepository;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<WorkplaceDataModel>> GetAllWorkplacesAsync()
        {
            try
            {
                var workplaces = await _workplaceRepository.GetAllWorkplacesAsync();
                var workplaceDataModels = _mapper.Map<IEnumerable<WorkplaceDataModel>>(workplaces);
                return workplaceDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving workplaces.");
                throw;
            }
        }

        public async Task<WorkplaceDataModel> GetWorkplaceByIdAsync(int id)
        {
            try
            {
                var workplace = await _workplaceRepository.GetWorkplaceByIdAsync(id);
                var workplaceDataModel = _mapper.Map<WorkplaceDataModel>(workplace);
                return workplaceDataModel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving workplace with ID {id}.");
                throw;
            }
        }

        public async Task CreateWorkplaceAsync(WorkplaceDataModel workplaceDataModel)
        {
            try
            {
                var workplaceEntity = _mapper.Map<WorkplaceEntity>(workplaceDataModel);
                await _workplaceRepository.CreateWorkplaceAsync(workplaceEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating workplace.");
                throw;
            }
        }

        public async Task UpdateWorkplaceAsync(int id, WorkplaceDataModel updatedWorkplaceDataModel)
        {
            try
            {
                var existingWorkplace = await _workplaceRepository.GetWorkplaceByIdAsync(id);
                if (existingWorkplace == null)
                    throw new NotFoundException($"Workplace with ID {id} not found.");

                _mapper.Map(updatedWorkplaceDataModel, existingWorkplace);

                await _workplaceRepository.UpdateWorkplaceAsync(existingWorkplace);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating workplace with ID {id}.");
                throw;
            }
        }

        public async Task DeleteWorkplaceAsync(int id)
        {
            try
            {
                var workplace = await _workplaceRepository.GetWorkplaceByIdAsync(id);
                if (workplace == null)
                    throw new NotFoundException($"Workplace with ID {id} not found.");

                await _workplaceRepository.DeleteWorkplaceAsync(workplace);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting workplace with ID {id}.");
                throw;
            }
        }

        public async Task<string> UploadImageAsync(int id, IFormFile file, string storageDirectory)
        {
            try
            {
                storageDirectory = "Workplaces";
                var workplace = await _workplaceRepository.GetWorkplaceByIdAsync(id);
                if (workplace == null)
                    throw new NotFoundException($"Workplace with ID {id} not found.");

                var fileName = await _imageService.UploadImageAsync(file, storageDirectory);

                return fileName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while uploading image for timereport with ID {id}.");
                throw;
            }
        }
    }
}