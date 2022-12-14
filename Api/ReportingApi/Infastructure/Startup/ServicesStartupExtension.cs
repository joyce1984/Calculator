using Microsoft.Extensions.DependencyInjection;
using ReportingApi.Infastructure.Services;

namespace ReportingApi.Infastructure.Startup
{
    public static class ServicesStartupExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IReportingService, ReportingService>();
            return services;
        }
    }
}
