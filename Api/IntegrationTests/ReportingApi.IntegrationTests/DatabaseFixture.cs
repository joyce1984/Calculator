using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ReportingApi.Infastructure.Data;
using System.Data.Common;

namespace ReportingApi.IntegrationTests
{
    public class DatabaseFixture : IDisposable
    {
        public DatabaseFixture()
        {
            var startup = new Startup();
            Host = new HostBuilder()
            .ConfigureWebJobs(startup.Configure)
            .ConfigureWebJobs(a =>
            {

                var dbContextDescriptor = a.Services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbContextOptions<ReportingContext>));

                a.Services.Remove(dbContextDescriptor);

                var dbConnectionDescriptor = a.Services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbConnection));

                a.Services.Remove(dbConnectionDescriptor);

                a.Services.AddDbContext<ReportingContext>(options =>
             options.UseInMemoryDatabase("IntegrationTests"));

                a.Services.AddScoped<IReportingContext>(provider => provider.GetService<ReportingContext>());
            })
            .Build();

            ReportingContext = Host.Services.GetRequiredService<IReportingContext>();
        }

        public void Dispose()
        {
            ReportingContext = null;
        }
        public IHost Host { get; set; }
        public IReportingContext ReportingContext { get; set; }
    }
}
