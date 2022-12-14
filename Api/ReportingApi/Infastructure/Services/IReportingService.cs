using Domain;
using System.Threading;
using System.Threading.Tasks;

namespace ReportingApi.Infastructure.Services
{
    public interface IReportingService
    {
        Task<bool> AddUsage(CalculatorUsage calculatorUsage, CancellationToken cancellationToken);
    }
}
