using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Timereporting.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "app_user",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserUUID = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserName = table.Column<string>(type: "longtext", nullable: false),
                    NormalizedUserName = table.Column<string>(type: "longtext", nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false),
                    NormalizedEmail = table.Column<string>(type: "longtext", nullable: false),
                    EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false),
                    PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_app_user", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "report_type",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UserCreated = table.Column<Guid>(type: "char(36)", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastTimeUpdated = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserUpdated = table.Column<Guid>(type: "char(36)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    TimeDeleted = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserDeleted = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_report_type", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "timereport",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserUUID = table.Column<Guid>(type: "char(36)", nullable: false),
                    WorkplaceUUID = table.Column<Guid>(type: "char(36)", nullable: false),
                    TimeReportUUID = table.Column<Guid>(type: "char(36)", nullable: false),
                    SubFilterId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false),
                    ImageFileName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    ImageFilePath = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ImageFileContentType = table.Column<string>(type: "varchar(48)", maxLength: 48, nullable: false),
                    ImageFileData = table.Column<byte[]>(type: "longblob", nullable: false),
                    TimeStarted = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TimeEnded = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalHours = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsOpened = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    TimeOpened = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsClosed = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    TimeFinalized = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserFinalized = table.Column<Guid>(type: "char(36)", nullable: false),
                    UserCreated = table.Column<Guid>(type: "char(36)", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastTimeUpdated = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserUpdated = table.Column<Guid>(type: "char(36)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    TimeDeleted = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserDeleted = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_timereport", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "workplace",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    WorkplaceUUID = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true),
                    ImageFileName = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    ImageFilePath = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true),
                    ImageFileContentType = table.Column<string>(type: "varchar(48)", maxLength: 48, nullable: true),
                    ImageFileData = table.Column<byte[]>(type: "longblob", nullable: true),
                    Address = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    City = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ZipCode = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    UserCreated = table.Column<Guid>(type: "char(36)", nullable: false),
                    TimeCreated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LastTimeUpdated = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserUpdated = table.Column<Guid>(type: "char(36)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    TimeDeleted = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UserDeleted = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_workplace", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "app_user");

            migrationBuilder.DropTable(
                name: "report_type");

            migrationBuilder.DropTable(
                name: "timereport");

            migrationBuilder.DropTable(
                name: "workplace");
        }
    }
}
