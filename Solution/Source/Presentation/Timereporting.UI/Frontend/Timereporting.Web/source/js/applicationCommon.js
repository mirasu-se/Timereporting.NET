// Import common application styles
import '../sass/applicationCommon.scss';
// Import application identity core from appIdentityCore.js
import appIdentityCore from './application/appIdentityCore';
// Import application logger from appLogger.js
import appLogger from './application/logging/appLogger';

import appEnvironmentResolver from './application/environment/appEnvironmentResolver';

// Invoke the AppEnvironmentServices to resolve environment configuration 
appEnvironmentResolver.configureEnvironment();


const appBaseName = appIdentityCore.getAppBaseName();
const appVersion = appIdentityCore.getAppVersion();
const appEnvironment = appIdentityCore.getAppEnvironment();

const module = "applicationCommon.js";
const moduleLocation = "source/js/applicationCommon.js";

// Log informative information using appLogger
appLogger.logMessage(`Application Registered: ${appBaseName} v ${appVersion}`, true);
appLogger.logMessage(`Application Environment: ${appEnvironment}`, true);
appLogger.logMessage(`Module Registered: ${module}`, true);
appLogger.logMessage(`Module Location: ${moduleLocation}`, true);

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

