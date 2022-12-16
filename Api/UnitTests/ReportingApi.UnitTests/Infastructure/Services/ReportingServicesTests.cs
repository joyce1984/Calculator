namespace ReportingApi.UnitTests.Infastructure.Services
{
    public class ReportingServiceTests
    {
        private readonly Mock<IReportingContext> _context;
        private readonly ReportingService _reportingService;
        public ReportingServiceTests()
        {
            _context = new Mock<IReportingContext>();
            _context.Setup(a => a.CalculatorUsages).ReturnsDbSet(new List<Domain.CalculatorUsage>());
            _reportingService = new ReportingService(_context.Object);
        }
        [Fact]
        public void When_all_dependencies_have_been_provided_then_the_reporting_service_will_initialises()
        {
            _reportingService.Should().NotBeNull();
        }
        [Fact]
        public void When_the_context_dependency_is_missing_then_an_argument_null_exception_is_thrown()
        {
            Action act = () => new ReportingService(null);

            act.Should().Throw<ArgumentNullException>();
        }
        [Fact]
        public async Task When_a_usage_is_added_and_saved_then_a_successful_response_is_returned()
        {
            var calculatorUsage = new Domain.CalculatorUsage();

            _context.Setup(a => a.SaveAsync()).ReturnsAsync(1);

            var response = await _reportingService.AddUsage(calculatorUsage, new CancellationToken());

            response.Should().BeTrue();

            _context.Verify(a=>a.CalculatorUsages.AddAsync(It.IsAny<Domain.CalculatorUsage>(), It.IsAny<CancellationToken>()), Times.Once());

            _context.Verify(a => a.SaveAsync(), Times.Once());
        }
        [Fact]
        public async Task When_a_usage_is_added_and_is_not_saved_then_a_unsuccessful_response_is_returned()
        {
            var calculatorUsage = new Domain.CalculatorUsage();

            _context.Setup(a => a.SaveAsync()).ReturnsAsync(0);

            var response = await _reportingService.AddUsage(calculatorUsage, new CancellationToken());

            response.Should().BeFalse();

            _context.Verify(a => a.CalculatorUsages.AddAsync(It.IsAny<Domain.CalculatorUsage>(), It.IsAny<CancellationToken>()), Times.Once());

            _context.Verify(a => a.SaveAsync(), Times.Once());
        }
    }
}
