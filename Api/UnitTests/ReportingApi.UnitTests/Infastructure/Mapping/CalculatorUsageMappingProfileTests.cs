namespace ReportingApi.UnitTests.Infastructure.Mapping
{
    public class CalculatorUsageMappingProfileTests : TestBase
    {
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        public CalculatorUsageMappingProfileTests()
        {
            _mapperConfiguration = new MapperConfiguration(config => config.AddProfile(new CalculatorUsageMappingProfile()));
            _mapper = new Mapper(_mapperConfiguration);
        }
        [Fact()]
        public void When_a_dto_is_passed_to_the_mapper_then_a_domain_object_is_returned()
        {
            var calculatorUsageDto = GenerateObject<CalculatorUsageRequestDto>();

            _mapperConfiguration.AssertConfigurationIsValid();
            var calculatorUsage = _mapper.Map<CalculatorUsageRequestDto, Domain.CalculatorUsage>(calculatorUsageDto);

            calculatorUsage.Should().NotBeNull();

            calculatorUsage.FirstNumber.Should().Be(calculatorUsageDto.FirstNumber);
            calculatorUsage.SecondNumber.Should().Be(calculatorUsageDto.SecondNumber);
            calculatorUsage.Operator.Should().Be(calculatorUsageDto.Operator);
            calculatorUsage.Answer.Should().Be(calculatorUsageDto.Answer);
            calculatorUsage.QuestionNumber.Should().Be(calculatorUsageDto.CalculatorInformation.QuestionNumber);
            calculatorUsage.SchoolId.Should().Be(calculatorUsageDto.CalculatorInformation.SchoolId);
            calculatorUsage.UserId.Should().Be(calculatorUsageDto.CalculatorInformation.UserId);
        }
        
    }
}
