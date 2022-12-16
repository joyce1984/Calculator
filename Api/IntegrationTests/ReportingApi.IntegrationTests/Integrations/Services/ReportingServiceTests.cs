namespace ReportingApi.IntegrationTests.Integrations.Services
{
    public class ReportingServiceTests : IClassFixture<DatabaseFixture>
    {
        private readonly DatabaseFixture _fixture;
        public ReportingServiceTests(DatabaseFixture fixture)
        {
            _fixture = fixture;
        }
        [Fact]
        public async Task When_a_usage_is_added_it_is_saved_to_the_database()
        {
            var reportingService = new ReportingService(_fixture.ReportingContext);

            var calculatorUsage = new CalculatorUsage { Id = Guid.NewGuid(), FirstNumber = "2", Operator = "X", SecondNumber = "10", Answer = "20", QuestionNumber = 1, SchoolId = Guid.NewGuid(), UserId = Guid.NewGuid() };

            var response = await reportingService.AddUsage(calculatorUsage, new CancellationToken());

            response.Should().BeTrue();

            var usageInDatabase = _fixture.ReportingContext.CalculatorUsages.FirstOrDefault(a => a.Id == calculatorUsage.Id);

            usageInDatabase.Should().NotBeNull();
        }
    }
}
