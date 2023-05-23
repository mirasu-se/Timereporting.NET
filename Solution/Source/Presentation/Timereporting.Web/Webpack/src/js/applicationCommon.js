// Import common application styles
import '../sass/applicationCommon.scss';
// Import application identity core from appIdentityCore.js
import appIdentityCore from './application/appIdentityCore';
// Import application logger from appLogger.js
import appLogger from './infrastructure/logging/appLogger';

// Import the configureFunctionality function from AppEnvironment.js
import { configureEnvironmentServices } from './infrastructure/environment/configurationResolver';

// Invoke the configureServices method
configureEnvironmentServices();

const appBaseName = appIdentityCore.getAppBaseName();
const appLogLevel = appIdentityCore.getAppLogLevel();
const appEnvironment = appIdentityCore.getAppEnvironment();

// Log module availability and information
if (appEnvironment === 'DEVELOPMENT') 
{
  appLogger.logTitle(' is up and running!', appLogLevel, false);
  appLogger.logMessage('LOG FROM MODULE: ApplicationCommon.js', false);
  appLogger.logMessage('MODULE LOCATION: Timereporting.Web/Webpack/src/js/ApplicationCommon.js', false);
  appLogger.logMessage('CONFIGURATION FILE: Timereporting.Web/Webpack/webpack/webpack.common-mvc.js', false);
  appLogger.logMessage('DESCRIPTION:', false);
  appLogger.logMessage('ApplicationCommon.js is a shared JavaScript module that provides common functionality and utilities across all views. It encapsulates reusable code and ensures consistency throughout the application. Any changes or updates made to this script will have a global impact on the application behavior and features. Please exercise caution and review the documentation before modifying this file.', false);
}


// Get the button element
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to check if the page has been scrolled enough to show the button
function toggleScrollToTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.classList.add("active");
    } else {
        scrollToTopBtn.classList.remove("active");
    }
}

// Add scroll event listener to the window
window.addEventListener("scroll", toggleScrollToTopButton);

// Function to smoothly scroll back to the top of the page when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Add click event listener to the button
scrollToTopBtn.addEventListener("click", scrollToTop);

