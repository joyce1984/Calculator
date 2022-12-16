using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace ReportingApi.Infastructure.Data
{
    public class ReportingContext : DbContext, IReportingContext
    {
        public ReportingContext()
        {
        }
        public ReportingContext(DbContextOptions<ReportingContext> options) : base(options)
        {
            if (!Database.IsInMemory())
            {
                Database.Migrate();
            }
        }
        public virtual DbSet<CalculatorUsage> CalculatorUsages { get; set; }

        public async Task<int> SaveAsync()
        {
            return await SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CalculatorUsage>().ToTable("CalculatorUsage");
        }
    }
    public class CollectionDeliveryContextFactory : IDesignTimeDbContextFactory<ReportingContext>
    {
        private readonly IConfiguration _configuration;
        public CollectionDeliveryContextFactory()
        {
            _configuration = GetConfiguration();
        }

        public ReportingContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ReportingContext>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));

            return new ReportingContext(optionsBuilder.Options);
        }

        private IConfigurationRoot GetConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
        }
    }
}
