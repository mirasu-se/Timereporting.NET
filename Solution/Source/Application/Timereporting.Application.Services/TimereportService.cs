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


        public async Task<IEnumerable<TimereportDataModel>> GetTimeReportsAsync(int workplaceId, DateTime? fromDate, DateTime? toDate)
        {
            if (workplaceId != 0 && fromDate != null && toDate != null)
            {
                return await GetTimereportsBetweenDatesAsync(workplaceId, fromDate.Value, toDate.Value);
            }
            else if (workplaceId != 0 && fromDate != null)
            {
                return await GetTimereportsByStartDateAsync(workplaceId, fromDate.Value);
            }
            else if (workplaceId != 0 && toDate != null)
            {
                return await GetTimereportsByEndDateAsync(workplaceId, toDate.Value);
            }
            else if (workplaceId != 0)
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

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByEndDateAsync(int workplaceId, DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByEndDateAsync(workplaceId, toDate);
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
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
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
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
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
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
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports up to {toDate} for all workplaces.");
                throw;
            }
        }


        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsBetweenDatesAsync(int workplaceId, DateTime fromDate, DateTime toDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsBetweenDatesAsync(workplaceId, fromDate, toDate);
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} between start date {fromDate} and end date {toDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByStartDateAsync(int workplaceId, DateTime fromDate)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByStartDateAsync(workplaceId, fromDate);
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId} and start date {fromDate}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetTimereportsByWorkplaceAsync(int workplaceId)
        {
            try
            {
                var timereports = await _timereportRepository.GetTimereportsByWorkplaceAsync(workplaceId);
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereports for workplace with ID {workplaceId}.");
                throw;
            }
        }

        public async Task<IEnumerable<TimereportDataModel>> GetAllTimereportsAsync()
        {
            try
            {
                var timereports = await _timereportRepository.GetAllTimereportsAsync();
                var timereportDataModels = _mapper.Map<IEnumerable<TimereportDataModel>>(timereports);
                return timereportDataModels;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving timereports.");
                throw;
            }
        }

        public async Task<TimereportDataModel> GetTimereportByIdAsync(int id)
        {
            try
            {
                var timereport = await _timereportRepository.GetTimereportByIdAsync(id);
                var timereportDataModel = _mapper.Map<TimereportDataModel>(timereport);
                return timereportDataModel;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving timereport with ID {id}.");
                throw;
            }
        }

        public async Task CreateTimereportAsync(TimereportDataModel timereportDataModel)
        {
            try
            {
                var timereportEntity = _mapper.Map<TimereportEntity>(timereportDataModel);
                await _timereportRepository.CreateTimereportAsync(timereportEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating timereport.");
                throw;
            }
        }

        public async Task UpdateTimereportAsync(int id, TimereportDataModel updatedTimereportDataModel)
        {
            try
            {
                var existingTimereport = await _timereportRepository.GetTimereportByIdAsync(id);
                if (existingTimereport == null)
                    throw new NotFoundException($"Timereport with ID {id} not found.");

                _mapper.Map(updatedTimereportDataModel, existingTimereport);

                await _timereportRepository.UpdateTimereportAsync(existingTimereport);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating timereport with ID {id}.");
                throw;
            }
        }

        public async Task DeleteTimereportAsync(int id)
        {
            try
            {
                var timereport = await _timereportRepository.GetTimereportByIdAsync(id);
                if (timereport == null)
                    throw new NotFoundException($"Timereport with ID {id} not found.");

                await _timereportRepository.DeleteTimereportAsync(timereport);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting timereport with ID {id}.");
                throw;
            }
        }

        public async Task<string> UploadImageAsync(int id, IFormFile file, string storageDirectory)
        {
            try
            {
                storageDirectory = "Timereports";
                var timereport = await _timereportRepository.GetTimereportByIdAsync(id);
                if (timereport == null)
                    throw new NotFoundException($"Timereport with ID {id} not found.");

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