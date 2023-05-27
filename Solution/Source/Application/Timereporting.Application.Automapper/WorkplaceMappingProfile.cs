using AutoMapper;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Interaction.DataTransfer.Models.Api;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Automapper
{
    public class WorkplaceMappingProfile : Profile
    {
        public WorkplaceMappingProfile()
        {
            ConfigureApiToApplicationMapping();

            ConfigureServiceToRepositoryMapping();
        }

        // This method configures the mapping from WorkplaceRequestModel to WorkplaceDataModel
        public void ConfigureApiToApplicationMapping()
        {
            CreateMap<WorkplaceRequestModel, WorkplaceDataModel>().ReverseMap();
        }

        // This method configures the mapping between WorkplaceDataModel and WorkplaceEntity in both directions
        public void ConfigureServiceToRepositoryMapping()
        {
            CreateMap<WorkplaceDataModel, WorkplaceEntity>().ReverseMap();
        }
    }
}