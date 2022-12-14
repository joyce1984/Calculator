using MediatR;
using System.Threading.Tasks;
using System.Threading;
using System;
using Dtos.CalculatorUsage;
using ReportingApi.Infastructure.Services;
using FluentValidation;
using AutoMapper;

namespace ReportingApi.Functions.Reporting.Commands
{
    public class CalculatorUsage
    {
        public class Command : IRequest<CalculatorUsageResponseDto>
        {
            public Command(CalculatorUsageRequestDto calculatorUsageRequest)
            {
                CalculatorUsage = calculatorUsageRequest;
            }

            public CalculatorUsageRequestDto CalculatorUsage { get; set; }
        }
        public class CommandHandler : IRequestHandler<Command, CalculatorUsageResponseDto>
        {
            private readonly IReportingService _reportingService;
            private readonly IValidator<CalculatorUsageRequestDto> _validator;
            private readonly IMapper _mapper;

            public CommandHandler(IReportingService reportingService, IValidator<CalculatorUsageRequestDto> validator, IMapper mapper)
            {
                _reportingService = reportingService ?? throw new ArgumentNullException(nameof(reportingService));
                _validator = validator ?? throw new ArgumentNullException(nameof(validator));
                _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            }
            public async Task<CalculatorUsageResponseDto> Handle(Command request, CancellationToken cancellationToken)
            {
                _validator.ValidateAndThrow(request.CalculatorUsage);

                var calendarUsage = _mapper.Map<Domain.CalculatorUsage>(request.CalculatorUsage);

                await _reportingService.AddUsage(calendarUsage, cancellationToken);

                return new CalculatorUsageResponseDto();
            }
        }
    }
}
