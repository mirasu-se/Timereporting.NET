using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Timereporting.Api.Configuration;
using Timereporting.Application.Automapper;
using Timereporting.Application.Services;
using Timereporting.Infrastructure.Repositories;
using Timereporting.Interaction.DataTransfer.Services.FileSystem.Images;
using Timereporting.Persistence;

namespace Timereporting.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void RegisterInfarstructureRepositories(IServiceCollection services)
        {
            services.AddScoped<ITimereportRepository, TimereportRepository>();
            services.AddScoped<IWorkplaceRepository, WorkplaceRepository>();
        }

        public void RegisterInfarstructureServices(IServiceCollection services)
        {
            services.AddScoped<ITimereportService, TimereportService>();
            services.AddScoped<IWorkplaceService, WorkplaceService>();
        }

        public void RegisterAutoMapperMappingProfiles(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(TimereportMappingProfile));
            services.AddAutoMapper(typeof(WorkplaceMappingProfile));
        }

        public void RegisterFileSystemServices(IServiceCollection services)
        {
            services.AddScoped<IImageFileService, ImageFileService>();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Timereporting API", Version = "v1" });
            });

            // Add Swagger JWT configuration services
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

            //    // Configure Swagger to include JWT authorization
            //    var securityScheme = new OpenApiSecurityScheme
            //    {
            //        Name = "Authorization",
            //        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
            //        Type = SecuritySchemeType.Http,
            //        Scheme = "bearer",
            //        BearerFormat = "JWT"
            //    };
            //    c.AddSecurityDefinition("Bearer", securityScheme);

            //    var securityRequirement = new OpenApiSecurityRequirement
            //    {
            //        { securityScheme, new[] { "Bearer" } }
            //    };
            //    c.AddSecurityRequirement(securityRequirement);
            //});

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(options =>
            //{
            //    var apiAccess = Configuration.GetSection("ApiAccessKeys").Get<ApiAccess>();

            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = false,
            //        ValidateAudience = false,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3549d8eb0d3589078cf60e54709e5416")),
            //    };
            //});

            // Configure JWT API acces options
            services.Configure<ApiAccessOptions>(Configuration.GetSection("ApiAccessOptions"));

            // Configure file hosting options
            services.Configure<FileHostingOptions>(Configuration.GetSection("FileHostingOptions"));

            // Configure application DbContext
            services.AddDbContext<AppDbContext>(options => options
                     .UseMySQL(Configuration.GetConnectionString("DefaultConnection"), x => x
                     .MigrationsAssembly("Timereporting.Infrastructure.Persistence")));
            services.AddHostedService<AppDbSeedingService>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:5001")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            RegisterAutoMapperMappingProfiles(services);
            RegisterInfarstructureServices(services);
            RegisterInfarstructureRepositories(services);
            RegisterFileSystemServices(services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors();

            app.UseRouting();

            app.UseStaticFiles(); // Enable serving of static files

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