class appIdentityCore {
  static getAppBaseName() { return 'Timereports.Web'; }
  static getAppBaseUrl() { return 'http://localhost:5000'; }
  static getAppEnvironment() { return 'DEVELOPMENT'; }
  static getAppLogLevel() { return 'Info'; }
  static getAppVersion() { return '1.0.0'; }
  static getAppMaxRequestSize() { return 1048576; }
  static getApiBaseName() { return 'Timereports.Api'; }
  static getApiBaseUrl() { return 'http://localhost:5001'; }
  static getApiEnvironment() { return 'DEVELOPMENT'; }

  static setAppName(appBaseName) { appIdentityCore.appBaseName = appBaseName; }
  static setAppBaseUrl(appBaseUrl) { appIdentityCore.appBaseUrl = appBaseUrl; }
  static setAppEnvironment(appEnvironment) { appIdentityCore.appEnvironment = appEnvironment; }
  static setAppLogLevel(appLogLevel) { appIdentityCore.appLogLevel = appLogLevel; }
  static setAppVersion(appVersion) { appIdentityCore.appVersion = appVersion; }
  static setAppMaxRequestSize(appMaxRequestSize) { appIdentityCore.appMaxRequestSize = appMaxRequestSize; }
  static setApiBaseName(apiBaseName) { appIdentityCore.apiBaseName = apiBaseName; }
  static setApiBaseUrl(apiBaseUrl) { appIdentityCore.apiBaseUrl = apiBaseUrl; }
  static setApiEnvironment(apiEnvironment) { appIdentityCore.apiEnvironment = apiEnvironment; }
}

export default appIdentityCore;