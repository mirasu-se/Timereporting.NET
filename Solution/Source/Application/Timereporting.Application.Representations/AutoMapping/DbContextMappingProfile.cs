using AutoMapper;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Infrastructure.Data.Entities.Timereport;
using Timereporting.Infrastructure.Data.Entities.Workplace;
using Timereporting.Interaction.DTO;
using Timereporting.Interaction.DTO.Timereport;
using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Application.Representations.AutoMapping
{
    public class DbContextMappingProfile : Profile
    {
        public DbContextMappingProfile()
        {
            CreateMap<AppUserEntity, AppUserDto>().ReverseMap();
            CreateMap<ReportTypeEntity, ReportTypeDto>().ReverseMap();
            CreateMap<TimereportEntity, TimereportDto>().ReverseMap();
            CreateMap<WorkplaceEntity, WorkplaceDto>().ReverseMap();
            // Add more mappings for other entity classes and DTOs
        }
    }
}