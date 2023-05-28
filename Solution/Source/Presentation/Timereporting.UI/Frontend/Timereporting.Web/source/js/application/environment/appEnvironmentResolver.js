import appIdentityCore from '../appIdentityCore';
import appLogger from '../../application/logging/appLogger';

const appBaseName = appIdentityCore.getAppBaseName();
const appVersion = appIdentityCore.getAppVersion();
const appLogLevel = appIdentityCore.getAppLogLevel();
const appEnvironment = appIdentityCore.getAppEnvironment();

class appEnvironmentResolver {
  static configureEnvironment() {
    let isDevelopmentConfigured = false; 
    let isStaggingConfigured = false; 
    let isProductionConfigured = false; 

    switch (appEnvironment) {
      // Configure functionality for the development environment
      case 'DEVELOPMENT':
        appLogger.logMessage(`[${appLogLevel}] - Hello dev, welcome to ${appBaseName} ${appVersion}, you are running in [${appEnvironment}] environment. Happy coding!`, false);
         // In this environment application will display console logs      
        // Add logic to configure development environment
         // ...........ADD YOUR CODE HERE.................

        isDevelopmentConfigured = true;
        if(isDevelopmentConfigured === true){
          appLogger.logMessage(`${appEnvironment} configuration has been initialized succesfuly!`, true);
        }
        else{
          appLogger.logMessage(`Something went wrong while initializing ${appEnvironment} configuration!`, true);
        }
        break;
      // Configure functionality for the staging environment
      case 'STAGING':
         // In this environment application will not display console logs but we can uncomment logging for testing purposes
         // appLogger.logMessage(`Hello stagger, welcome to ${appBaseName} ${appVersion}, you are running in [${appEnvironment}] environment.);
         
         // ...........ADD YOUR CODE HERE.................

        isStaggingConfigured = true;
        if(isStaggingConfigured === true){
          // appLogger.logMessage(`${appEnvironment} configuration has been initialized succesfuly!`, true);
        }
        else{
          // appLogger.logMessage(`Something went wrong while initializing ${appEnvironment} configuration!`, true);
        }
          break;
      // Configure functionality for the production environment
      case 'PRODUCTION':
        appLogger.logMessage(`${appBaseName} is currently running in [${appEnvironment}] environment!`, false);
        appLogger.logMessage(`[${appLogLevel}] All modules and styles are compressed!`, false);
        appLogger.logMessage(`[${appLogLevel}] Initializing [${appEnvironment}] configuration...`, false);
        // Configure functionality for the production environment
        break;
      default:
        appLogger.logMessage(`Unknown environment: ${appEnvironment}`, false);
        appLogger.logMessage(`[${appLogLevel}] Initializing configuration for unknown environment...`, false);
        // Default case for unknown environments
        break;
    }
  }
}

export default appEnvironmentResolver;
