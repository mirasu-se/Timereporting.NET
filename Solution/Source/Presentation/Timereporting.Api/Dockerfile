# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Solution/Source/Presentation/Timereporting.API/Timereporting.Api.csproj", "Solution/Source/Presentation/Timereporting.API/"]
COPY ["Solution/Source/Infrastructure/Timereporting.Persistence/Timereporting.Persistence.csproj", "Solution/Source/Infrastructure/Timereporting.Persistence/"]
RUN dotnet restore "Solution/Source/Presentation/Timereporting.API/Timereporting.Api.csproj"
COPY . .
WORKDIR "/src/Solution/Source/Presentation/Timereporting.API"
RUN dotnet build "Timereporting.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Timereporting.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

RUN mkdir -p /app/images

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Timereporting.Api.dll"]