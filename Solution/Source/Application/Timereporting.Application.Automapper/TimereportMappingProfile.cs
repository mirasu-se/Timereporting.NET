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

        // This method configures the mapping from TimereportRequestModel to TimereportDataModel
        public void ConfigureApiToApplicationMapping()
        {
            CreateMap<TimereportRequestModel, TimereportDataModel>().ReverseMap();
        }

        // This method configures the mapping between TimereportDataModel and TimereportEntity in both directions
        public void ConfigureServiceToRepositoryMapping()
        {
            CreateMap<TimereportDataModel, TimereportEntity>().ReverseMap();
        }
    }
}