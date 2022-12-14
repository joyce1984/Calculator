using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace ReportingApi.Infastructure.Startup
{
    public static class LoggingStartupExtension
    {
        public static IServiceCollection AddLoggingServices(this IServiceCollection services, IConfigurationRoot configuration)
        {
            var key = configuration.GetValue("Values:ApplicationInsights:ConnectionString", string.Empty);
            Log.Logger = new LoggerConfiguration()
                    .WriteTo.ApplicationInsights(key, TelemetryConverter.Traces, Serilog.Events.LogEventLevel.Information)
                    .Enrich.WithProperty("Application", "ReportingApi")
                    .CreateLogger();

            return services.AddSingleton(Log.Logger);
        }
    }
}
