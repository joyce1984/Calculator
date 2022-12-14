using System;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Dtos.CalculatorUsage;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using ReportingApi.Functions.Reporting.Commands;
using Serilog;

namespace ReportingApi.Functions.Reporting
{
    public class ReportingFunctions
    {
        private readonly ILogger _logger;
        private readonly IMediator _mediator;

        public ReportingFunctions(ILogger logger, IMediator mediator)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [FunctionName("Send")]
        [OpenApiOperation(operationId: "Send", tags: new[] { "Reporting" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "function_key", In = OpenApiSecurityLocationType.Header)]
        [OpenApiRequestBody(contentType: "text/json", bodyType: typeof(CalculatorUsageRequestDto), Required = true)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "text/json", bodyType: typeof(CalculatorUsageResponseDto), Description = "Created Response")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            var response = new CalculatorUsageResponseDto();
            CalculatorUsageRequestDto calculatorUsageRequest = null;
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                _logger.Information("Calculation Usage", requestBody);

                calculatorUsageRequest = JsonConvert.DeserializeObject<CalculatorUsageRequestDto>(requestBody);

                calculatorUsageRequest.CorrelationId = calculatorUsageRequest.CalculatorInformation.CorrelationId;

                response = await _mediator.Send(new CalculatorUsage.Command(calculatorUsageRequest), new CancellationToken());
            }
            catch (ValidationException ex)
            {
                return CreateBadRequestResult(response, ex);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Unexpected Exception", calculatorUsageRequest);

                return CreateUnexpectedErrorResponse(response);
            }
            finally
            {
                _logger.Information("Calculation Usage Response", response);
            }
          
            return new CreatedResult(string.Empty, response);   
        }
        private IActionResult CreateBadRequestResult(CalculatorUsageResponseDto response, ValidationException ex)
        {
            response.Messages = ex.Errors.Select(a => a.ErrorMessage).ToList();

            return new BadRequestObjectResult(response);
        }
        private IActionResult CreateUnexpectedErrorResponse(CalculatorUsageResponseDto response)
        {
            response.Messages.Add("Unexpected Exception");

            return new ObjectResult(response) { StatusCode = 500 };
        }
    }
}

