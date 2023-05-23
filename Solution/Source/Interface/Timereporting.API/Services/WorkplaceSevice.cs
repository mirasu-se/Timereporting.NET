using Timereporting.Api.Repositories.Contracts;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Services
{
    public class WorkplaceService : IWorkplaceService
    {
        private readonly IWorkplaceRepository _workplaceRepository;

        public WorkplaceService(IWorkplaceRepository workplaceRepository)
        {
            _workplaceRepository = workplaceRepository;
        }

        public IEnumerable<Workplace> GetAllWorkplacesAsync()
        {
            return _workplaceRepository.GetAllWorkplacesAsync().Result;
        }

        public Workplace GetWorkplaceByIdAsync(int id)
        {
            return _workplaceRepository.GetWorkplaceByIdAsync(id).Result;
        }

        public int CreateWorkplaceAsync(Workplace workplace)
        {
            workplace.WorkplaceUUID = Guid.NewGuid();
            workplace.TimeCreated = DateTime.UtcNow;

            return _workplaceRepository.CreateWorkplaceAsync(workplace).Result;
        }

        public void UpdateWorkplaceAsync(Workplace workplace)
        {
            var existingWorkplace = _workplaceRepository.GetWorkplaceByIdAsync(workplace.Id).Result;
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

            _workplaceRepository.UpdateWorkplaceAsync(existingWorkplace).Wait();
        }

        public void DeleteWorkplaceAsync(int id)
        {
            var existingWorkplace = _workplaceRepository.GetWorkplaceByIdAsync(id).Result;
            if (existingWorkplace == null)
            {
                throw new ArgumentException("Workplace not found.");
            }

            existingWorkplace.IsDeleted = true;
            existingWorkplace.TimeDeleted = DateTime.UtcNow;
            existingWorkplace.UserDeleted = Guid.NewGuid();

            _workplaceRepository.DeleteWorkplaceAsync(existingWorkplace).Wait();
        }
    }
}
