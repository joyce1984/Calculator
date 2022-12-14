using Dtos.CalculatorUsage;
using FluentValidation;
using System.Collections.Generic;
using System.Linq;

namespace ReportingApi.Functions.Reporting.Validation
{
    public class CalculateUsageValidator : AbstractValidator<CalculatorUsageRequestDto>
    {
        public CalculateUsageValidator()
        {
            var validOperators = new List<string> { "X", "+", "/", "-" };
            RuleFor(calculateUsage => calculateUsage)
            .Must(calculateUsage => calculateUsage != null)
            .WithName($"{nameof(CalculatorUsageRequestDto)}").WithMessage("Please provide some calculator usage")
            .DependentRules(() =>
            {
                RuleFor(a => a.CorrelationId).NotEmpty();
                RuleFor(a => a.Answer).NotEmpty();
                RuleFor(a => a.CalculatorInformation.QuestionNumber).NotEmpty().GreaterThan(0);
                RuleFor(a => a.CalculatorInformation.SchoolId).NotEmpty();
                RuleFor(a => a.FirstNumber).NotEmpty();
                RuleFor(a => a.SecondNumber).NotEmpty();
                RuleFor(a => a.Operator).Must(x => validOperators.Any(a=> a == x.ToUpper()))
                    .WithMessage("Please only use: " + string.Join(",", validOperators));
            });
        }
    }
}
