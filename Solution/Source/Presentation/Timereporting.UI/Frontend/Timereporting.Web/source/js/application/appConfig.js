import appSettingsDevelopment from '../../../../../../Timereporting.Web/appsettings.DEVELOPMENT.json';
import appSettingsStaging from '../../../../../../Timereporting.Web/appsettings.STAGING.json';
import appSettingsProduction from '../../../../../../Timereporting.Web/appsettings.PRODUCTION.json';

const Environment = "DEVELOPMENT";

const getConfigurationByEnvironment = (environment) => {
  switch (environment) {
    case 'DEVELOPMENT':
      return appSettingsDevelopment.AppConfig;
    case 'STAGING':
      return appSettingsStaging.AppConfig;
    case 'PRODUCTION':
      return appSettingsProduction.AppConfig;
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
};

class AppConfig {
  constructor() {
    this.config = null;
    this.loadConfig();
  }

  loadConfig() {
    const environmentConfig = getConfigurationByEnvironment(Environment);
    this.config = { ...this.config, ...environmentConfig };
  }

  getAppBaseName() {
    return this.config.AppBaseName;
  }

  getAppBaseUrl() {
    return this.config.AppBaseUrl;
  }

  getAppEnvironment() {
    return this.config.AppEnvironment;
  }

  getAppLogLevel() {
    return this.config.AppLogLevel;
  }

  getAppVersion() {
    return this.config.AppVersion;
  }

  getAppResourceHostingUrl() {
    return this.config.AppResourceHostingUrl;
  }

  getAppImageFileDirectory() {
    return this.config.AppImageFileDirectory;
  }

  getApiBaseName() {
    return this.config.ApiBaseName;
  }

  getApiBaseUrl() {
    return this.config.ApiBaseUrl;
  }

  getApiAuthorizationKey() {
    return this.config.ApiAuthorizationKey;
  }

  getApiVersion() {
    return this.config.ApiVersion;
  }
}

export default new AppConfig();
