using FluentValidation;
using MediatR;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReportingApi;
using ReportingApi.Infastructure.Startup;
using System;
[assembly: WebJobsStartup(typeof(Startup))]
namespace ReportingApi
{
    public class Startup : IWebJobsStartup
    {
        public void Configure(IWebJobsBuilder builder)
        {
            ConfigureServices(builder.Services);
        }

        private static void ConfigureServices(IServiceCollection services)
        {

            var assemby = typeof(Startup).Assembly;

            IConfigurationRoot config = GetConfiguration();

            services.AddSingleton<IConfiguration>(config);

            services.AddMediatR(assemby);

            services.AddServices();

            services.AddDataRepositories(config);

            services.AddValidatorsFromAssembly(assemby);

            services.AddLoggingServices(config);

            services.AddAutoMapper(assemby);
        }

        private static IConfigurationRoot GetConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
        }
    }
}
