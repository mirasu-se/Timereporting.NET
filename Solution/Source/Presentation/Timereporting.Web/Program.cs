using Microsoft.AspNetCore;

namespace Timereporting.Web
{
    // The entry point of the application
    public class Program
    {
        public static void Main(string[] args)
        {
            // Build and run the web host
            CreateWebHostBuilder(args).Build().Run();
        }

        // Create and configure the web host builder
        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var webHostBuilder = WebHost.CreateDefaultBuilder(args);

            // Configure the application's configuration sources
            return webHostBuilder.ConfigureAppConfiguration((hostingContext, config) =>
            {
                var env = hostingContext.HostingEnvironment;

                // Add JSON configuration files
                config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);

                // Add environment variables as configuration source
                config.AddEnvironmentVariables();
            })
            // Specify the startup class
            .UseStartup<Startup>();
        }
    }
}