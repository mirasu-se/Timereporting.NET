using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Timereporting.Api.Controllers;
using Timereporting.Application.Repositories.Application;
using Timereporting.Application.Repositories.Contracts;
using Timereporting.Application.Repositories.Timereport;
using Timereporting.Application.Repositories.Workplace;
using Timereporting.Application.Representations.AutoMapping;
using Timereporting.Application.Services.Application;
using Timereporting.Application.Services.Contracts;
using Timereporting.Application.Services.Timereport;
using Timereporting.Application.Services.Workplace;
using Timereporting.Infrastructure.Configuration.API.Models;
using Timereporting.Infrastructure.Data;
using Timereporting.Infrastructure.Data.Entities.Application;
using Timereporting.Infrastructure.Data.Seeders.AppUserClaims;
using Timereporting.Infrastructure.Data.Services;

namespace Timereporting.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void RegisterApiRepositories(IServiceCollection services)
        {
            services.AddScoped<IAppUserRepository, AppUserRepository>();
            services.AddScoped<IReportTypeRepository, ReportTypeRepository>();
            services.AddScoped<ITimereportRepository, TimereportRepository>();
            services.AddScoped<IWorkplaceRepository, WorkplaceRepository>();
        }

        public void RegisterApiServices(IServiceCollection services)
        {
            services.AddScoped<IAppUserService, AppUserService>();
            services.AddScoped<IReportTypeService, ReportTypeService>();
            services.AddScoped<ITimereportService, TimereportService>();
            services.AddScoped<IWorkplaceService, WorkplaceService>();
        }

        public void RegisterApiControllers(IServiceCollection services)
        {
            services.AddTransient<AppUserController>();
            services.AddTransient<ReportTypeController>();
            services.AddTransient<TimereportController>();
            services.AddTransient<WorkplaceController>();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(DbContextMappingProfile));

            services.AddHttpClient();

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Timereporting API", Version = "v1" });
            });

            services.Configure<ApiAccessOptions>(Configuration.GetSection("ApiAccessOptions"));

            services.AddDbContext<AppDbContext>(options =>
                options.UseMySQL(Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("Timereporting.Api")));

            services.AddHostedService<AppDbContextSeedingService>();

            services.AddDefaultIdentity<AppUserEntity>().AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

            services.AddScoped<IUserClaimsPrincipalFactory<AppUserEntity>, AppUserClaimsPrincipalFactory>();

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    var apiAccess = Configuration.GetSection("ApiAccessKeys").Get<ApiAccessKeys>();

            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = false,
            //        ValidateAudience = false,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3549d8eb0d3589078cf60e54709e5416")),
            //    };
            //});

            RegisterApiRepositories(services);
            RegisterApiServices(services);
            RegisterApiControllers(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            //app.UseAuthorization();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Timereporting API V1");
                });
            }

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
