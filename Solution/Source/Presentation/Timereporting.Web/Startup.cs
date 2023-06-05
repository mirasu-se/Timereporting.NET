using Microsoft.AspNetCore.Razor.TagHelpers;
using Timereporting.UI.Features.TagHelpers.Metadata.Services;
using Timereporting.Web.Configuration;

namespace Timereporting.Web
{
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private IWebHostEnvironment HostingEnvironment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigurationOptions(services);

            ConfigureUIServices(services);
        }



        public void ConfigurationOptions(IServiceCollection services)
        {
            // Add antiforgery service
            services.AddAntiforgery();

            // Add AddHttpClient 
            services.AddHttpClient();

            // Configure app identity configuration using app settings
            services.Configure<AppConfig>(Configuration.GetSection("AppConfig"));

            // Add MVC services with Razor runtime compilation
            services.AddMvc(option => option.EnableEndpointRouting = true).AddRazorRuntimeCompilation();
        }

        public void ConfigureUIServices(IServiceCollection services)
        {
            // Register the MetadataTagBuildingService as a singleton tag helper component
            services.AddSingleton<ITagHelperComponent, MetadataTagBuildingService>();
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

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "home",
                    pattern: "/",
                    defaults: new { controller = "Home", action = "Index" });

                endpoints.MapControllerRoute(
                    name: "previewTimereport",
                    pattern: "/timereport",
                    defaults: new { controller = "Timereport", action = "PreviewTimereport" });

                endpoints.MapControllerRoute(
                    name: "createTimereport",
                    pattern: "/timereport/create",
                    defaults: new { controller = "Timereport", action = "CreateTimereport" });

                endpoints.MapControllerRoute(
                    name: "previewWorkplace",
                    pattern: "/workplace",
                    defaults: new { controller = "Workplace", action = "PreviewWorkplace" });

                endpoints.MapControllerRoute(
                    name: "createWorkplace",
                    pattern: "/workplace/create",
                    defaults: new { controller = "Workplace", action = "CreateWorkplace" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapRazorPages();
            });
        }
    }
}