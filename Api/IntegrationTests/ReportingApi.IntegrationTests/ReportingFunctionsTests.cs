using FluentAssertions;
using FluentAssertions.Common;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting;
using ReportingApi.Infastructure.Data;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace ReportingApi.IntegrationTests
{
    public class ReportingFunctionsTests : TestBase, IClassFixture<DatabaseFixture>
    {
        private readonly ReportingFunctions _sut;
        private readonly DatabaseFixture _fixture;
        public ReportingFunctionsTests(DatabaseFixture fixture)
        {
            _fixture = fixture;

            _sut = new ReportingFunctions(_fixture.Host.Services.GetRequiredService<ILogger>(), _fixture.Host.Services.GetRequiredService<IMediator>());
        }

        [Fact]
        public async Task When_invalid_data_is_sent_then_a_bad_request_result_is_returned()
        {
            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1 }, CorrelationId = Guid.Empty, FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _sut.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            var badRequestResult = response as BadRequestObjectResult;

            badRequestResult.Should().NotBeNull();

            badRequestResult.StatusCode.Should().Be(400);

            var responseMessage = badRequestResult.Value as CalculatorUsageResponseDto;

            responseMessage.Should().NotBeNull();

            responseMessage.IsSuccessful.Should().BeFalse();

            responseMessage.Messages.Should().NotBeEmpty();

        }

        [Fact]
        public async Task When_calculator_usage_is_successfully_saved_then_a_201_created_response_is_returned()
        {
            var calculatorUsageRequest = new CalculatorUsageRequestDto { CalculatorInformation = new CalculatorInformationDto { UserId = Guid.NewGuid(), SchoolId = Guid.NewGuid(), QuestionNumber = 1, CorrelationId = Guid.NewGuid() }, CorrelationId = Guid.NewGuid(), FirstNumber = "10", Operator = "X", SecondNumber = "2", Answer = "20" };

            var response = await _sut.Run(CreateHttpRequest(new Dictionary<string, StringValues>(), JsonConvert.SerializeObject(calculatorUsageRequest)));

            response.Should().NotBeNull();

            var createdResult = response as CreatedResult;

            createdResult.Should().NotBeNull();

            createdResult.StatusCode.Should().Be(201);

            var responseMessage = createdResult.Value as CalculatorUsageResponseDto;

            responseMessage.Should().NotBeNull();

            responseMessage.IsSuccessful.Should().BeTrue();

            responseMessage.Messages.Should().BeEmpty();

        }
    }
}