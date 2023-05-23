#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Solution/Source/Presentation/Timereporting.Web/Timereporting.Web.csproj", "Solution/Source/Presentation/Timereporting.Web/"]
RUN dotnet restore "Solution/Source/Presentation/Timereporting.Web/Timereporting.Web.csproj"
COPY . .
WORKDIR "/src/Solution/Source/Presentation/Timereporting.Web"
RUN dotnet build "Timereporting.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Timereporting.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Timereporting.Web.dll"]