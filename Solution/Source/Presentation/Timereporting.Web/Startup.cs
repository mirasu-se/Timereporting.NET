using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.TagHelpers.Metadata.Services;

namespace Timereporting.Web
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private IWebHostEnvironment HostingEnvironment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            // Injected configuration is assigned to the Configuration property usin dependency injection
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAntiforgery();

            // HostOptions Configuration: Configure the application host context from configuration file.
            services.Configure<HostOptions>(Configuration.GetSection("HostOptions"));
            var hostOptions = services.BuildServiceProvider().GetService<IOptions<HostOptions>>().Value;


            // Singleton Service Registration: Register the MetadataInjector as a singleton service.
            services.AddSingleton<ITagHelperComponent, MetadataBuildingService>();

            // MVC Configuration: Add MVC and enable razor runtime compilation.
            services.AddMvc(option => option.EnableEndpointRouting = true).AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {

            app.UseStaticFiles(); // Enable serving of static files

            app.UseRouting(); // Enable routing

            app.UseStaticFiles(); // Configure static files middleware 


            if (HostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); // Show detailed error information during development
            }

            else
            {
                app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS

                app.UseExceptionHandler("/error"); // Handle exceptions and redirect to an error page
            }

            // Configuring the endpoints for request routing
            app.UseEndpoints(endpoints =>
            {
                // Mapping the home route to the HomeController's Index action
                endpoints.MapControllerRoute(
                    name: "home",
                    pattern: "/",
                    defaults: new { controller = "Home", action = "Index" });

                // Mapping the time report preview route to the TimeReportController's PreviewTimeReport action
                endpoints.MapControllerRoute(
                    name: "timereports",
                    pattern: "/timereports",
                    defaults: new { controller = "Timereport", action = "PreviewTimereport" });

                // Mapping the time report creation route to the TimeReportController's CreateTimeReport action
                endpoints.MapControllerRoute(
                    name: "timereport",
                    pattern: "/timereports/add-timereport",
                    defaults: new { controller = "Timereport", action = "CreateTimereport" });

                // Mapping the workplace preview route to the WorkplaceController's PreviewWorkplace action
                endpoints.MapControllerRoute(
                    name: "workplaces",
                    pattern: "/workplaces",
                    defaults: new { controller = "Workplace", action = "PreviewWorkplace" });

                // Mapping the documentation database route to the DocumentationController's DatabaseWorks action
                endpoints.MapControllerRoute(
                    name: "documentation-database",
                    pattern: "/docs/database",
                    defaults: new { controller = "Documentation", action = "DatabaseWorks" });

                // Mapping the documentation API route to the DocumentationController's ApiDocumentation action
                endpoints.MapControllerRoute(
                    name: "documentation-api",
                    pattern: "/docs/api",
                    defaults: new { controller = "Documentation", action = "ApiDocumentation" });

                // Mapping the documentation Docker route to the DocumentationController's DockerCompose action
                endpoints.MapControllerRoute(
                    name: "documentation-docker",
                    pattern: "/docs/docker",
                    defaults: new { controller = "Documentation", action = "DockerCompose" });

                // Mapping the documentation metadata route to the DocumentationController's MetadataInjection action
                endpoints.MapControllerRoute(
                    name: "documentation-metadata",
                    pattern: "/docs/metadata",
                    defaults: new { controller = "Documentation", action = "MetadataInjection" });

                // Mapping the documentation performance route to the DocumentationController's PerformanceOptimization action
                endpoints.MapControllerRoute(
                    name: "documentation-performance",
                    pattern: "/docs/performance",
                    defaults: new { controller = "Documentation", action = "PerformanceOptimization" });

                // Mapping the documentation Webpack route to the DocumentationController's WebpackBundling action
                endpoints.MapControllerRoute(
                    name: "documentation-webpack",
                    pattern: "/docs/webpack",
                    defaults: new { controller = "Documentation", action = "WebpackBundling" });

                // Default route for other controllers and actions
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                // Mapping Razor Pages endpoints
                endpoints.MapRazorPages();
            });
        }
    }
}
