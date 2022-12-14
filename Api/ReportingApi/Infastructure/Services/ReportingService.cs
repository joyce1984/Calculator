using Domain;
using ReportingApi.Infastructure.Data;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ReportingApi.Infastructure.Services
{
    public class ReportingService : IReportingService
    {
        private readonly IReportingContext _reportingContext;

        public ReportingService(IReportingContext reportingContext)
        {
            _reportingContext = reportingContext ?? throw new ArgumentNullException(nameof(reportingContext));
        }
        public async Task<bool> AddUsage(CalculatorUsage calculatorUsage, CancellationToken cancellationToken)
        {
            await _reportingContext.CalculatorUsages.AddAsync(calculatorUsage, cancellationToken);

            var rowCount = await _reportingContext.SaveAsync();

            return rowCount > 0;
        }


    }
}
