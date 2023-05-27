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

