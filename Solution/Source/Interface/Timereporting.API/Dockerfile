#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Solution/Source/Interface/Timereporting.API/Timereporting.Api.csproj", "Solution/Source/Interface/Timereporting.API/"]
COPY ["Solution/Source/Infrastructure/Timereporting.Infrastructure/Timereporting.Infrastructure.csproj", "Solution/Source/Infrastructure/Timereporting.Infrastructure/"]
COPY ["Solution/Source/Interface/Timereporting.Api.Configuration/Timereporting.Api.Configuration.csproj", "Solution/Source/Interface/Timereporting.Api.Configuration/"]
RUN dotnet restore "Solution/Source/Interface/Timereporting.API/Timereporting.Api.csproj"
COPY . .
WORKDIR "/src/Solution/Source/Interface/Timereporting.API"
RUN dotnet build "Timereporting.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Timereporting.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Timereporting.Api.dll"]