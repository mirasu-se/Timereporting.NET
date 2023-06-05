using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Mysqlx.Crud;
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
        private readonly IMapper _mapper;

        public WorkplaceService(
            ILogger<WorkplaceService> logger,
            IWorkplaceRepository workplaceRepository,
            IMapper mapper)
        {
            _logger = logger;
            _workplaceRepository = workplaceRepository;
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

        public async Task<WorkplaceDataModel> GetWorkplaceByIdAsync(Guid workplaceId)
        {
            try
            {
                var workplace = await _workplaceRepository.GetWorkplaceByIdAsync(workplaceId);
                var workplaceDataModel = _mapper.Map<WorkplaceDataModel>(workplace);
                return workplaceDataModel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving workplace with workplaceId {workplaceId}.");
                throw;
            }
        }

        public async Task CreateWorkplaceAsync(WorkplaceDataModel dataModel)
        {
            try
            {
                var workplaceEntity = _mapper.Map<WorkplaceEntity>(dataModel);

                if (dataModel.ImageFile != null)
                {
                    workplaceEntity.ImageUrl = $"img/workplace/WP_ID_{dataModel.WorkplaceId}{Path.GetExtension(dataModel.ImageFile.FileName)}";
                    using var memoryStream = new MemoryStream();
                    await dataModel.ImageFile.CopyToAsync(memoryStream);
                    workplaceEntity.ImageData = memoryStream.ToArray();
                }

                await _workplaceRepository.CreateWorkplaceAsync(workplaceEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating workplace.");
                throw;
            }
        }

        public async Task UpdateWorkplaceAsync(Guid workplaceId, WorkplaceDataModel updatedDataModel)
        {
            try
            {
                var existingWorkplace = await _workplaceRepository.GetWorkplaceByIdAsync(workplaceId);
                if (existingWorkplace == null)
                    throw new NotFoundException($"Workplace with workplaceId {workplaceId} not found.");

                _mapper.Map(updatedDataModel, existingWorkplace);

                if (updatedDataModel.ImageFile != null)
                {
                    existingWorkplace.ImageUrl = $"img/workplace/WP_ID_{updatedDataModel.WorkplaceId}{Path.GetExtension(updatedDataModel.ImageFile.FileName)}";

                    using var memoryStream = new MemoryStream();
                    await updatedDataModel.ImageFile.CopyToAsync(memoryStream);
                    existingWorkplace.ImageData = memoryStream.ToArray();
                }

                await _workplaceRepository.UpdateWorkplaceAsync(existingWorkplace);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating workplace with workplaceId {workplaceId}.");
                throw;
            }
        }

        public async Task DeleteWorkplaceAsync(Guid workplaceId)
        {
            try
            {
                var workplace = await _workplaceRepository.GetWorkplaceByIdAsync(workplaceId);
                if (workplace == null)
                    throw new NotFoundException($"Workplace with workplaceId {workplaceId} not found.");

                await _workplaceRepository.DeleteWorkplaceAsync(workplace);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting workplace with workplaceId {workplaceId}.");
                throw;
            }
        }
    }
}