// Import application identity core from appIdentityCore.js
import appIdentityCore from '../../application/appIdentityCore';
// Import application logger from AppLogger.js
import appLogger from '../logging/appLogger';

const appBaseName = appIdentityCore.getAppBaseName();
const appEnvironment = appIdentityCore.getAppEnvironment();
const appLogLevel = appIdentityCore.getAppLogLevel();


export function configureEnvironmentServices() {
    switch (appEnvironment) {
        case 'DEVELOPMENT':
        // Configure functionality for the development environment
        appLogger.logMessage('[' + appLogLevel + '] ' + appBaseName + ' is in [' + appEnvironment + '] environment!', false);

        // Configure functionality for the development environment
        appLogger.logMessage('[' + appLogLevel + '] ' + appEnvironment + ' CONFIGURATION HAS BEEN INITIALIZED', false);
        break;
        case 'PRODUCTION':
        // Configure functionality for the production environment
        appLogger.logMessage(appBaseName + ' is currently running in [' + appEnvironment + '] environment!', false);
        appLogger.logMessage('[' + appLogLevel + '] ' + 'All modules and styles are compressed!', false);
        appLogger.logMessage('[' + appLogLevel + '] ' + 'Initializing [' + appEnvironment + '] configuration...', false);
        break;
        case 'STAGING':
        // Configure functionality for the staging environment
        appLogger.logMessage(appBaseName + ' is currently running in [' + appEnvironment + '] environment!', false);
        appLogger.logMessage('[' + appLogLevel + '] ' + 'Performing staging environment specific configurations...', false);
        break;
        // Add more cases for other popular environments as needed
        default:
        // Default case for unknown environments
        appLogger.logMessage('Unknown environment: ' + appEnvironment, false);
        appLogger.logMessage('[' + appLogLevel + '] ' + 'Initializing configuration for unknown environment...', false);
        break;
    }
}
  