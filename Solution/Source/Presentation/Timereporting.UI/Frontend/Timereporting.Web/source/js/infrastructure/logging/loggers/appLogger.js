import appConfig from '../../../application/appConfig';
import DateTimeProvider from '../../datetime/dateTimeProvider';

const dateTimeProvider = new DateTimeProvider();

class AppLogger {
  constructor() {
    this.appEnvironment = appConfig.getAppEnvironment();
    this.currentDateTime =  dateTimeProvider.getCurrentDateTime();
    this.currentTime = dateTimeProvider.getCurrentTime();
  }

  logInfoMessage(message, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      this.logMessage('INFO', message, includeTime);
    } 
  }

  logExceptionMessage(exception, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      this.logMessage('EXCEPTION', exception, includeTime);
    }
  }

  logErrorMessage(error, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      this.logMessage('ERROR', error, includeTime);
    }
  }

  logMessage(type, message, includeTime) {
    const timePrefix = includeTime ? `${this.currentDateTime} -` : '';
    console.log(`[${type}] - ${timePrefix} ${message}`);
  }
  
  logModuleInfo(moduleName, modulePath) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      const appBaseName = appConfig.getAppBaseName();
      const appVersion = appConfig.getAppVersion();
      const appEnvironment = appConfig.getAppEnvironment();
  
      this.logInfoMessage(`Application: ${appBaseName} v${appVersion}`, true);
      this.logInfoMessage(`Environment: ${appEnvironment}`, true);
      this.logInfoMessage(`Module: ${moduleName}`, true);
      this.logInfoMessage(`Path: ${modulePath}`, true);
    } 
  }
}

export default AppLogger;
