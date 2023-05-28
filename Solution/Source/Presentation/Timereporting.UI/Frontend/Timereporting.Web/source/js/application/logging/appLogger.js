import appIdentityCore from '../appIdentityCore';
import dateTimeProvider from '../../infrastructure/datetime/dateTimeProvider';


const appEnvironment = appIdentityCore.getAppEnvironment();
const appLogLevel = appIdentityCore.getAppLogLevel();
const currentDateTime = dateTimeProvider.getCurrentDateTime();
const currentTime = dateTimeProvider.getCurrentTime();

class appLogger {
  constructor(appLogLevel) {
    this.appEnvironment = appEnvironment;
    this.appLogLevel = appLogLevel;
    this.currentDateTime = currentDateTime;
    this.currentTime = currentTime;
  }

  logTitle(label, appLogLevel = this.appLogLevel, includeTime = true) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      const dateTimePrefix = includeTime ? `[${this.currentDateTime}] ` : '';
      console.groupCollapsed(`${this.currentDateTime} [${appLogLevel}] ${dateTimePrefix}${label}`);
    }
  }

  logMessage(message, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      const timePrefix = includeTime ? `${this.currentDateTime} -` : '';
      console.log(`${timePrefix} ${message}`);
    } else {
      const timePrefix = includeTime ? `${this.currentDateTime} -` : '';
      console.log(`${timePrefix} ${message}`);
    }
  }

  logException(exception, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      const timePrefix = includeTime ? `${this.currentDateTime} -` : '';
      console.log(`${timePrefix} ${exception}`);
    }
  }

  logError(error, includeTime) {
    if (this.appEnvironment === 'DEVELOPMENT') {
      const timePrefix = includeTime ? `${this.currentDateTime} -` : '';
      console.log(`${timePrefix} ${error}`);
    }
  }
}

export default new appLogger(appLogLevel);
