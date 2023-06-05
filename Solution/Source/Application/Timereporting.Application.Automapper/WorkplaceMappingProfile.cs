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

        public void ConfigureApiToApplicationMapping()
        {
            CreateMap<WorkplaceRequestModel, WorkplaceDataModel>().ForMember(
                dest => dest.CreatedTime, opt => opt.MapFrom(src => src.CreatedTime.ToString("yyyy-MM-dd HH:mm:ss"))).ReverseMap();
        }

        public void ConfigureServiceToRepositoryMapping()
        {
            CreateMap<WorkplaceDataModel, WorkplaceEntity>().ReverseMap();
        }
    }
}