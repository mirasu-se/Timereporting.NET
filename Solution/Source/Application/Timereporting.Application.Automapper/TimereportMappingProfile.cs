using AutoMapper;
using Timereporting.Infrastructure.Persistence.Entities;
using Timereporting.Interaction.DataTransfer.Models.Api;
using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Application.Automapper
{
    public class TimereportMappingProfile : Profile
    {
        public TimereportMappingProfile()
        {
            ConfigureApiToApplicationMapping();
            ConfigureServiceToRepositoryMapping();
        }

        public void ConfigureApiToApplicationMapping()
        {
            CreateMap<TimereportRequestModel, TimereportDataModel>().ReverseMap();
        }

        public void ConfigureServiceToRepositoryMapping()
        {
            CreateMap<TimereportDataModel, TimereportEntity>().ReverseMap();
        }
    }
}