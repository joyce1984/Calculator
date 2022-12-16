namespace ReportingApi.UnitTests
{
    public class ReportingFunctionsTest : TestBase
    {
        private readonly ReportingFunctions _reportingFunctions;
        private readonly Mock<ILogger> _logger;
        private readonly Mock<IMediator> _mediator;
        public ReportingFunctionsTest()
        {
            _logger = new Mock<ILogger>();
            _mediator = new Mock<IMediator>();
            _reportingFunctions = new ReportingFunctions(_logger.Object, _mediator.Object);
        }

        [Fact]
        public void When_all_depedencies_are_provided_the_function_will_initialise_successfully()
        {
            _reportingFunctions.Should().NotBeNull();
        }

        [Fact]
        public void When_the_logger_dependency_is_missing_the_jobFunction_will_throw_an_arguement_null_exception()
        {
            Action act = () => new ReportingFunctions(null, _mediator.Object);

            act.Should().Throw<ArgumentNullException>();
        }
        [Fact]
        public void When_the_mediator_dependency_is_missing_the_jobFunction_will_throw_an_arguement_null_exception()
        {
            Action act = () => new ReportingFunctions(_logger.Object, null);

            act.Should().Throw<ArgumentNullException>();
        }
        [Fact]
        public async Task When_the_send_function_is_triggered_it_is_logged()
        {
            var messageId = Guid.NewGuid();

            _mediator.Setup(x => x.Send(It.IsAny<CalculatorUsage.Command>(), It.IsAny<CancellationToken>())).ReturnsAsync(new CalculatorUsageResponseDto());

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.NewGuid(), FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _reportingFunctions.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            _logger.Verify(a => a.Information($"Calculation Usage", It.IsAny<string>()), Times.Once);

        }
        [Fact]
        public async Task When_invalid_data_is_sent_then_a_bad_request_result_is_returned()
        {
            var messageId = Guid.NewGuid();

            var validationErrors = new List<ValidationFailure> { new ValidationFailure("FirstNumber", "Missing") }; 

            _mediator.Setup(x => x.Send(It.IsAny<CalculatorUsage.Command>(), It.IsAny<CancellationToken>())).ThrowsAsync(new ValidationException("validation errors", validationErrors));

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.Empty, FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" }; ;

            var response = await _reportingFunctions.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            var badRequestResult = response as BadRequestObjectResult;

            badRequestResult.Should().NotBeNull();

            badRequestResult.StatusCode.Should().Be(400);

            var responseMessage = badRequestResult.Value as CalculatorUsageResponseDto;

            responseMessage.Should().NotBeNull();

            responseMessage.IsSuccessful.Should().BeFalse();

            responseMessage.Messages.Should().NotBeEmpty();

            _logger.Verify(a => a.Information($"Calculation Usage", It.IsAny<string>()), Times.Once);

        }

        [Fact]
        public async Task When_an_unexpected_error_is_thrown_it_is_captured_logged_and_a_500_error_is_returned()
        {
            var messageId = Guid.NewGuid();

            _mediator.Setup(x => x.Send(It.IsAny<CalculatorUsage.Command>(), It.IsAny<CancellationToken>())).ThrowsAsync(new OutOfMemoryException());

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.NewGuid(), FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _reportingFunctions.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            var errorResult = response as ObjectResult;

            errorResult.Should().NotBeNull();

            errorResult.StatusCode.Should().Be(500);

            var responseMessage = errorResult.Value as CalculatorUsageResponseDto;

            responseMessage.Should().NotBeNull();

            responseMessage.IsSuccessful.Should().BeFalse();

            responseMessage.Messages.Should().NotBeEmpty();

            _logger.Verify(a => a.Information($"Calculation Usage", It.IsAny<string>()), Times.Once);

            _logger.Verify(a => a.Error(It.IsAny<Exception>(),It.IsAny<string>(), It.IsAny<CalculatorUsageRequestDto>()), Times.Once);
        }
        [Fact]
        public async Task When_calculator_usage_is_successfully_saved_then_a_201_created_response_is_returned()
        {
            var messageId = Guid.NewGuid();

            _mediator.Setup(x => x.Send(It.IsAny<CalculatorUsage.Command>(), It.IsAny<CancellationToken>())).ReturnsAsync(new CalculatorUsageResponseDto());

            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.NewGuid(), FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _reportingFunctions.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            var createdResult = response as CreatedResult;

            createdResult.Should().NotBeNull();

            createdResult.StatusCode.Should().Be(201);

            var responseMessage = createdResult.Value as CalculatorUsageResponseDto;

            responseMessage.Should().NotBeNull();

            responseMessage.IsSuccessful.Should().BeTrue();

            responseMessage.Messages.Should().BeEmpty();

            _logger.Verify(a => a.Information($"Calculation Usage", It.IsAny<string>()), Times.Once);

            _logger.Verify(a => a.Information($"Calculation Usage Response", It.IsAny<CalculatorUsageResponseDto>()), Times.Once);

            _logger.Verify(a => a.Error(It.IsAny<Exception>(), It.IsAny<string>(), It.IsAny<CalculatorUsageRequestDto>()), Times.Never);
        }
    }
}