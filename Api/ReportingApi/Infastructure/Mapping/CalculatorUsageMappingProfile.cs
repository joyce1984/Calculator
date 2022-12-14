using AutoMapper;
using Domain;
using Dtos.CalculatorUsage;

namespace ReportingApi.Infastructure.Mapping
{
    public class CalculatorUsageMappingProfile : Profile
    {
        public CalculatorUsageMappingProfile()
        {
            CreateMap<CalculatorUsageRequestDto, CalculatorUsage>()
                .ForMember(destination => destination.Id, source => source.Ignore())
                .ForMember(destination => destination.UserId, source => source.MapFrom(a => a.CalculatorInformation.UserId))
                .ForMember(destination => destination.SchoolId, source => source.MapFrom(a => a.CalculatorInformation.SchoolId))
                .ForMember(destination => destination.QuestionNumber, source => source.MapFrom(a => a.CalculatorInformation.QuestionNumber));

        }
    }
}
