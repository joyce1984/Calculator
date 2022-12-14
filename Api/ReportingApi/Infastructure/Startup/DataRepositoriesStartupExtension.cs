using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReportingApi.Infastructure.Data;

namespace ReportingApi.Infastructure.Startup
{
    public static class DataRepositoriesStartupExtension
    {
        public static IServiceCollection AddDataRepositories(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddDbContext<ReportingContext>(options =>
               options.UseSqlServer(
                   configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IReportingContext>(provider => provider.GetService<ReportingContext>());

            return services;
        }
    }
}
