// Import common application styles
import '../sass/applicationCommon.scss';
import AppLogger from './infrastructure/logging/loggers/appLogger';

// Create an instance of AppMainLogger
const appLogger = new AppLogger();

// Log module application and module info to the console
appLogger.logModuleInfo("applicationCommon.js","source/js/applicationCommon.js");


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

