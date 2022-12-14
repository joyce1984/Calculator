using Domain;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ReportingApi.Infastructure.Data
{
    public interface IReportingContext
    {
        DbSet<CalculatorUsage> CalculatorUsages { get; set; }
        Task<int> SaveAsync();
    }
}
