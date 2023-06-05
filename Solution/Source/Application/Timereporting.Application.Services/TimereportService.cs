using AutoMapper;
using Microsoft.Extensions.Logging;
using OpenQA.Selenium;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Infrastructure.Repositories;
using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Interaction.DataTransfer.Services.FileSystem.Images;

namespace Timereporting.Application.Services
{
    public class TimereportService : ITimereportService
    {
        private readonly ILogger<TimereportService> _logger;
        private readonly IImageFileService _imageService;
        private readonly ITimereportRepository _timereportRepository;
        private readonly IMapper _mapper;

        public TimereportService(
            ILogger<TimereportService> logger,
            IImageFileService imageService,
            ITimereportRepository timereportRepository,
            IMapper mapper)
        {
            _logger = logger;
            _imageService = imageService;
            _timereportRepository = timereportRepository;
            _mapper = mapper;
        }


        public async Task<IEnumerable<TimereportDataModel>> GetTimeReportsAsync(Guid workplaceId, DateTime? fromDate, DateTime? toDate)
        {
            if (workplaceId != Guid.Empty && fromDate != null && toDate != null)
            {
                return await GetTimereportsBetweenDatesAsync(workplaceId, fromDate.Value, toDate.Value);
            }
            else if (workplaceId != Guid.Empty && fromDate != null)
            {
                return await GetTimereportsByStartDateAsync(workplaceId, fromDate.Value);
            }
            else if (workplaceId != Guid.Empty && toDate != null)
            {
                return await GetTimereportsByEndDateAsync(workplaceId, toDate.Value);
            }
            else if (workplaceId != Guid.Empty)
            {
                return await GetTimereportsByWorkplaceAsync(workplaceId);
            }
            else if (fromDate != null && toDate != null)
            {
                return await GetTimereportsBetweenDatesForAllWorkplacesAsync(fromDate.Value, toDate.Value);
            }
            else if (fromDate != null)
            {
                return await GetTimereportsByStartDateForAllWorkplacesAsync(fromDate.Value);
            }
            else if (toDate != null)
            {
                return await GetTimereportsByEndDateForAllWorkplacesAsync(toDate.Value);
            }
            else
            {
                return await GetAllTimereportsAsync();
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateAsync(Guid workplaceId, DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByEndDateAsync(workplaceId, toDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} and end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesForAllWorkplacesAsync(DateTime fromDate, DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsBetweenDatesForAllWorkplacesAsync(fromDate, toDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports between start date {fromDate} and end date {toDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateForAllWorkplacesAsync(DateTime fromDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByStartDateForAllWorkplacesAsync(fromDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports starting from {fromDate} for all workplaces.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateForAllWorkplacesAsync(DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByEndDateForAllWorkplacesAsync(toDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports up to {toDate} for all workplaces.");
                throw;
            }
        }


        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesAsync(Guid workplaceId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsBetweenDatesAsync(workplaceId, fromDate, toDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId} between start date {fromDate} and end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateAsync(Guid workplaceId, DateTime fromDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByStartDateAsync(workplaceId, fromDate);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId} and start date {fromDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByWorkplaceAsync(Guid workplaceId)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByWorkplaceAsync(workplaceId);
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with workplaceId {workplaceId}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetAllTimereportsAsync()
        {
            try
            {
                var timereports = await _timereportRepository.GetAllTimereportsAsync();
                var dataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return dataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving timereports.");
                throw;
            }
        }

        public async Task<TimereportDataModel> GetTimereportByIdAsync(Guid workplaceId)
        {
            try
            {
                var timereport = await _timereportRepository.GetTimereportByIdAsync(workplaceId);
                var dataModel = _mapper.Map<TimereportDataModel>(timereport);
                return dataModel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with workplaceId {workplaceId}.");
                throw;
            }
        }

        public async Task CreateTimereportAsync(TimereportDataModel dataModel)
        {
            try
            {
                var timereportEntity = _mapper.Map<TimereportEntity>(dataModel);

                if (dataModel.ImageFile != null)
                {
                    timereportEntity.ImageUrl = $"img/timereport/TR_ID_{dataModel.TimereportId}{Path.GetExtension(dataModel.ImageFile.FileName)}";
                    using var memoryStream = new MemoryStream();
                    await dataModel.ImageFile.CopyToAsync(memoryStream);
                    timereportEntity.ImageData = memoryStream.ToArray();
                }

                await _timereportRepository.CreateTimereportAsync(timereportEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating timereport.");
                throw;
            }
        }

        public async Task UpdateTimereportAsync(Guid timereportId, TimereportDataModel updatedTimereportDataModel)
        {
            try
            {
                var existingTimereport = await _timereportRepository.GetTimereportByIdAsync(timereportId);
                if (existingTimereport == null)
                    throw new NotFoundException($"Timereport with timereportId {timereportId} not found.");

                _mapper.Map(updatedTimereportDataModel, existingTimereport);

                if (updatedTimereportDataModel.ImageFile != null)
                {
                    existingTimereport.ImageUrl = $"img/timereport/TR_ID_{updatedTimereportDataModel.TimereportId}{Path.GetExtension(updatedTimereportDataModel.ImageFile.FileName)}";
                    using var memoryStream = new MemoryStream();
                    await updatedTimereportDataModel.ImageFile.CopyToAsync(memoryStream);
                    existingTimereport.ImageData = memoryStream.ToArray();
                }

                await _timereportRepository.UpdateTimereportAsync(existingTimereport);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating timereport with timereportId {timereportId}.");
                throw;
            }
        }

        public async Task DeleteTimereportAsync(Guid timereportId)
        {
            try
            {
                var timereport = await _timereportRepository.GetTimereportByIdAsync(timereportId);
                if (timereport == null)
                    throw new NotFoundException($"Timereport with timereportId {timereportId} not found.");

                await _timereportRepository.DeleteTimereportAsync(timereport);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting timereport with timereportId {timereportId}.");
                throw;
            }
        }
    }
}