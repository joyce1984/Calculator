using ValidationException = FluentValidation.ValidationException;
namespace ReportingApi.UnitTests.Functions.Reporting.Commands
{
    public class CalculatorUsageCommandHandlerTests : TestBase
    {
        private readonly CalculatorUsage.CommandHandler _commandHandler;
        private readonly Mock<IReportingService> _reportingService;
        private readonly Mock<IValidator<CalculatorUsageRequestDto>> _validator;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        public CalculatorUsageCommandHandlerTests()
        {
            _mapperConfiguration = new MapperConfiguration(config => config.AddProfile(new CalculatorUsageMappingProfile()));
            _mapper = new Mapper(_mapperConfiguration);
            _reportingService = new Mock<IReportingService>();
            _validator = new Mock<IValidator<CalculatorUsageRequestDto>>();
            _commandHandler = new CalculatorUsage.CommandHandler(_reportingService.Object, _validator.Object, _mapper);
        }

        [Fact]
        public void When_all_depedencies_are_provided_the_command_handler_will_initialise_successfully()
        {
            _commandHandler.Should().NotBeNull();
        }

        [Fact]
        public void When_the_reporting_dependency_is_missing_the_command_handler_will_throw_an_arguement_null_exception()
        {
            Action act = () => new CalculatorUsage.CommandHandler(null, _validator.Object, _mapper);

            act.Should().Throw<ArgumentNullException>();
        }
        [Fact]
        public void When_the_validator_dependency_is_missing_the_command_handler_will_throw_an_arguement_null_exception()
        {
            Action act = () => new CalculatorUsage.CommandHandler(_reportingService.Object, null, _mapper);

            act.Should().Throw<ArgumentNullException>();
        }
        [Fact]
        public void When_the_mapper_dependency_is_missing_the_command_handler_will_throw_an_arguement_null_exception()
        {
            Action act = () => new CalculatorUsage.CommandHandler(_reportingService.Object, _validator.Object, null);

            act.Should().Throw<ArgumentNullException>();
        }
    
        [Fact]
        public async Task When_invalid_data_is_sent_then_a_validation_exception_is_thrown()
        {
            var messageId = Guid.NewGuid();

            _validator.Setup(x => x.Validate(It.IsAny<ValidationContext<CalculatorUsageRequestDto>>())).Throws(new ValidationException("Validation Exception", new List<ValidationFailure> { new ValidationFailure("Destination", "Not enough numbers") }));

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.Empty, FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            Func<Task> act = async () => { await _commandHandler.Handle(new CalculatorUsage.Command(calculatorUsageRequest), new CancellationToken()); };
            
            await act.Should().ThrowAsync<ValidationException>();

        }

        [Fact]
        public async Task When_calculator_usage_is_saved_then_a_successful_response_is_returned()
        {
            var messageId = Guid.NewGuid();

            _reportingService.Setup(a => a.AddUsage(It.IsAny<Domain.CalculatorUsage>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.NewGuid(), FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _commandHandler.Handle(new CalculatorUsage.Command(calculatorUsageRequest), new CancellationToken());

            response.Should().NotBeNull();

            response.IsSuccessful.Should().BeTrue();

            response.Messages.Should().BeEmpty();

        }
    }
}
