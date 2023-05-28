/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/application/appIdentityCore.js":
/*!**************************************************!*\
  !*** ./source/js/application/appIdentityCore.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Timereporting_Web_appsettings_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../Timereporting.Web/appsettings.json */ "../../../Timereporting.Web/appsettings.json");


const appIdentityCore = {
  config: _Timereporting_Web_appsettings_json__WEBPACK_IMPORTED_MODULE_0__.appIdentity,

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appIdentityCore);

/***/ }),

/***/ "./source/js/application/logging/appLogger.js":
/*!****************************************************!*\
  !*** ./source/js/application/logging/appLogger.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appIdentityCore */ "./source/js/application/appIdentityCore.js");
/* harmony import */ var _infrastructure_datetime_dateTimeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../infrastructure/datetime/dateTimeProvider */ "./source/js/infrastructure/datetime/dateTimeProvider.js");




const appEnvironment = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppEnvironment();
const appLogLevel = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppLogLevel();
const currentDateTime = _infrastructure_datetime_dateTimeProvider__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentDateTime();
const currentTime = _infrastructure_datetime_dateTimeProvider__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentTime();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new appLogger(appLogLevel));


/***/ }),

/***/ "./source/js/infrastructure/datetime/dateTimeProvider.js":
/*!***************************************************************!*\
  !*** ./source/js/infrastructure/datetime/dateTimeProvider.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// A class for providing date and time information
class dateTimeProvider {
  // Get the current date and time
  static getCurrentDateTime() {
    const currentDate = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };
    // Return the formatted current date and time as a string
    return currentDate.toLocaleString('en-GB', options);
  }

  // Get the current time
  static getCurrentTime() {
    const currentDate = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };
    // Return the formatted current time as a string
    return currentDate.toLocaleString('en-GB', options);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dateTimeProvider); 

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ }),

/***/ "../../../Timereporting.Web/appsettings.json":
/*!***************************************************!*\
  !*** ../../../Timereporting.Web/appsettings.json ***!
  \***************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"appIdentity":{"appBaseName":"Timereports.Web","appBaseUrl":"http://localhost:5001","appEnvironment":"DEVELOPMENT","appLogLevel":"Info","appVersion":"1.0.0","appMaxRequestSize":1048576,"apiBaseName":"Timereports.Api","apiBaseUrl":"http://localhost:5000/api/v1","apiVersion":"1.0.0"},"Logging":{"LogLevel":{"Default":"Information","Microsoft.AspNetCore":"Warning"}},"Email":{"EnableSsl":false,"Host":"mail-server","Port":25,"Addresses":{"Sender":"info@dstx.se","Recipient":"develop@dstx.se"}},"WebHostingOptions":{"BasePublicUrl":"https://timereporting.trinax.se"},"ApiHostingOptions":{"BasePublicUrl":"https://arbetsprov.trinax.se","ApiEndpoint":"https://arbetsprov.trinax.se/api/v1/"},"FileHostingOptions":{"FileHostingUrl":"","TimereportFileDirectory":"Resources/Timereport","WorkplaceFileDirectory":"Resources/Workplace"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.web/views/timereport/previewTimeReportModule.js ***!
  \**********************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../application/logging/appLogger */ "./source/js/application/logging/appLogger.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
﻿// Import application logger from appLogger.js


// Define the fetchAllTimereports component
function fetchAllTimereports() {
  // Make an API request to fetch all timereports
  fetch("http://localhost:5000/api/v1/timereport")
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
      _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_0__["default"].logError("fetchAllTimereports:", data); // Log the error using the appLogger
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
      _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_0__["default"].logError("Error fetching timereports:", error); // Log the error using the appLogger
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchAllTimereports);


function fetchTimereportByTimereportId(reportId) {
  // Make a GET request to fetch the report data
  fetch(`http://localhost:5000/api/v1/timereport/${reportId}`)
    .then(response => response.json())
    .then(data => {
      // Update the modal with the fetched report data
      document.getElementById(`reportModalLabel`).innerText = 'Time Report Details';
      document.getElementById(`name`).innerText = `Date: ${data.name}`;     
      document.getElementById(`date`).innerText = `Date: ${data.date}`;
      document.getElementById(`workplace`).innerText = `Workplace: ${data.workplace}`;
      document.getElementById(`hours`).innerText = `Hours Worked: ${data.hours}`;
      
      // Show the modal
      $(`#reportDetails_${reportId}`).modal('show');
    })
    .catch(error => {
      console.error('Error fetching report data:', error);
    });
} window.fetchTimereportByTimereportId = fetchTimereportByTimereportId;


function fetchTimereportsBetweenDatesForAllWorkplaces(fromDate, toDate) {
  // Make an API request to fetch timereports between the selected dates for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsBetweenDatesForAllWorkplaces = fetchTimereportsBetweenDatesForAllWorkplaces;

function fetchTimereportsByStartDateForAllWorkplaces(fromDate) {
  // Make an API request to fetch timereports starting from the selected date for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByStartDateForAllWorkplaces = fetchTimereportsByStartDateForAllWorkplaces;

function fetchTimereportsByEndDateForAllWorkplaces(toDate) {
  // Make an API request to fetch timereports up to the selected end date for all workplaces
  fetch(`http://localhost:5000/api/v1/timereport?to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByEndDateForAllWorkplaces = fetchTimereportsByEndDateForAllWorkplaces;

function fetchTimereportsByWorkplace(workplaceId) {
  // Make an API request to fetch timereports for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByWorkplace = fetchTimereportsByWorkplace;

function fetchTimereportsByStartDate(workplaceId, fromDate) {
  // Make an API request to fetch timereports starting from the selected date for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByStartDate = fetchTimereportsByStartDate;

function fetchTimereportsByEndDate(workplaceId, toDate) {
  // Make an API request to fetch timereports up to the selected end date for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsByEndDate = fetchTimereportsByEndDate;

function fetchTimereportsBetweenDates(workplaceId, fromDate, toDate) {
  // Make an API request to fetch timereports between the selected dates for the selected workplace
  fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}&to_date=${toDate}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      processTimereports(data);
    })
    .catch((error) => {
      console.error("Error fetching timereports:", error);
    });
} window.fetchTimereportsBetweenDates = fetchTimereportsBetweenDates;

function fetchTimeReports(event) {
  event.preventDefault();

  // Get selected values
  var workplaceId = document.getElementById("workplace-filter").value;
  var fromDate = document.getElementById("from-date").value;
  var toDate = document.getElementById("to-date").value;

  // Determine the appropriate action based on the selected filters
  if (workplaceId && fromDate && toDate) {
    // Fetch timereports between selected dates for selected workplace
    fetchTimereportsBetweenDates(workplaceId, fromDate, toDate);
  } else if (workplaceId && fromDate) {
    // Fetch timereports starting from the selected date for selected workplace
    fetchTimereportsByStartDate(workplaceId, fromDate);
  } else if (workplaceId && toDate) {
    // Fetch timereports up to the selected end date for selected workplace
    fetchTimereportsByEndDate(workplaceId, toDate);
  } else if (workplaceId) {
    // Fetch timereports for the selected workplace
    fetchTimereportsByWorkplace(workplaceId);
  } else if (fromDate && toDate) {
    // Fetch timereports between the selected dates for all workplaces
    fetchTimereportsBetweenDatesForAllWorkplaces(fromDate, toDate);
  } else if (fromDate) {
    // Fetch timereports starting from the selected date for all workplaces
    fetchTimereportsByStartDateForAllWorkplaces(fromDate);
  } else if (toDate) {
    // Fetch timereports up to the selected end date for all workplaces
    fetchTimereportsByEndDateForAllWorkplaces(toDate);
  } else {
    // Fetch all timereports from all workplaces
    fetchAllTimereports();
  }
} window.fetchTimeReports = fetchTimeReports;

function processTimereports(data) {
  console.log("Processing timereports:", data);
  // Sort the data by report.id in ascending order
  data.sort((a, b) => a.id - b.id);

  // Clean the time-report-table by removing all existing rows
  const tableBody = document.querySelector("#time-report-table tbody");
  tableBody.innerHTML = "";

  // Generate new table rows based on the fetched data
  data.forEach((report) => {
    const buttonId = `btn_${report.id}`; // Unique ID for the button
    const dateParts = report.date.split('T')[0]; // Extract the date part before the 'T' delimiter
    const formattedDate = dateParts.split('-').reverse().join('-'); // Rearrange the date parts to format it as 'YYYY-MM-DD'

    const row = `<tr>
      <td>${formattedDate}</td>
      <td>${report.name}</td>
      <td>${report.hours.toFixed(2)}</td>
      <td>
        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
          <i class="btn btn-secondary bi bi-info-circle m-0"></i>
        </button>
      </td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  // Generate the modal elements
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.innerHTML = "";

  data.forEach((report) => {
    const modalId = `timereportDetails_${report.id}`;

    const modal = `
    <div id="modal-container"> 
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="timereportModalLabel">
                Tidsrapportdetaljer
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
            </div>
            <div class="card">
              <div class="card-body">
                <p><strong>Id:</strong> ${report.id}</p>
                <p><strong>Name:</strong> ${report.name}</p>
                <p><strong>Time:</strong> ${report.createdTime}</p>
                <p><strong>Info:</strong> ${report.info}</p>
                <div class="text-center">
                  <img src="${report.imageUrl || '/img/default/timereport/no_time_report_image.png'}" alt="Workplace Image" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    modalContainer.insertAdjacentHTML("beforeend", modal);
  });
}

})();

/******/ })()
;
//# sourceMappingURL=previewTimeReportModule.js.map