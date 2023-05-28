import appSettings from '../../../../../../Timereporting.Web/appsettings.json';

const appIdentityCore = {
  config: appSettings.appIdentity,

  loadConfig(config) {
    this.config = { ...this.config, ...config };
  },

  getAppBaseName() {
    return this.config.appBaseName;
  },

  getAppBaseUrl() {
    return this.config.appBaseUrl;
  },

  getAppEnvironment() {
    return this.config.appEnvironment;
  },

  getAppLogLevel() {
    return this.config.appLogLevel;
  },

  getAppVersion() {
    return this.config.appVersion;
  },

  getAppMaxRequestSize() {
    return this.config.appMaxRequestSize;
  },

  getApiBaseName() {
    return this.config.apiBaseName;
  },

  getApiBaseUrl() {
    return this.config.apiBaseUrl;
  },

  getApiEnvironment() {
    return this.config.apiEnvironment;
  },

  getApiVersion() {
    return this.config.apiVersion;
  },

  splitVersion(version) {
    return version.split('.');
  },

  getAppSyncVersion() {
    const { appBuildMajorVersion, appBuildMinorVersion, appBuildPatchVersion } = this.config;
    return `${appBuildMajorVersion}.${appBuildMinorVersion}.${appBuildPatchVersion}`;
  },

  getApiSyncVersion() {
    const { apiBuildMajorVersion, apiBuildMinorVersion, apiBuildPatchVersion } = this.config;
    return `${apiBuildMajorVersion}.${apiBuildMinorVersion}.${apiBuildPatchVersion}`;
  },

  getAppEnvironmentUrl() {
    if (this.config.appEnvironment === 'DEVELOPMENT') {
      return 'http://localhost:5001';
    } else if (this.config.appEnvironment === 'STAGING') {
      return 'https://staging-domain.com';
    } else if (this.config.appEnvironment === 'PRODUCTION') {
      return 'https://production-domain.com';
    }
  },
};

export default appIdentityCore;