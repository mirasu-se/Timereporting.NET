using Timereporting.Application.Repositories.Contracts;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Application.Services.Workplace
{
    public class WorkplaceService : IWorkplaceService
    {
        private readonly IWorkplaceRepository _workplaceRepository;

        public WorkplaceService(IWorkplaceRepository workplaceRepository)
        {
            _workplaceRepository = workplaceRepository;
        }

        public async Task<IEnumerable<WorkplaceDto>> GetAllWorkplacesAsync()
        {
            return await _workplaceRepository.GetAllWorkplacesAsync();
        }

        public async Task<WorkplaceDto> GetWorkplaceByIdAsync(Guid id)
        {
            return await _workplaceRepository.GetWorkplaceByIdAsync(id);
        }

        public async Task<int> CreateWorkplaceAsync(WorkplaceDto workplace)
        {
            workplace.WorkplaceUUID = Guid.NewGuid();
            workplace.TimeCreated = DateTime.UtcNow;

            return await _workplaceRepository.CreateWorkplaceAsync(workplace);
        }

        public async Task UpdateWorkplaceAsync(WorkplaceDto workplace)
        {
            var existingWorkplace = await _workplaceRepository.GetWorkplaceByIdAsync(workplace.WorkplaceUUID);
            if (existingWorkplace == null)
            {
                throw new ArgumentException("Workplace not found.");
            }

            existingWorkplace.Name = workplace.Name;
            existingWorkplace.Description = workplace.Description;
            existingWorkplace.ImageFileName = workplace.ImageFileName;
            existingWorkplace.ImageFilePath = workplace.ImageFilePath;
            existingWorkplace.ImageFileContentType = workplace.ImageFileContentType;
            existingWorkplace.ImageFileData = workplace.ImageFileData;
            existingWorkplace.Address = workplace.Address;
            existingWorkplace.City = workplace.City;
            existingWorkplace.ZipCode = workplace.ZipCode;
            existingWorkplace.LastTimeUpdated = DateTime.UtcNow;
            existingWorkplace.UserUpdated = workplace.UserUpdated;

            await _workplaceRepository.UpdateWorkplaceAsync(existingWorkplace);
        }

        public async Task DeleteWorkplaceAsync(Guid id)
        {
            var existingWorkplace = await _workplaceRepository.GetWorkplaceByIdAsync(id);
            if (existingWorkplace == null)
            {
                throw new ArgumentException("Workplace not found.");
            }

            existingWorkplace.IsDeleted = true;
            existingWorkplace.TimeDeleted = DateTime.UtcNow;
            existingWorkplace.UserDeleted = Guid.NewGuid();

            await _workplaceRepository.DeleteWorkplaceAsync(existingWorkplace);
        }
    }
}