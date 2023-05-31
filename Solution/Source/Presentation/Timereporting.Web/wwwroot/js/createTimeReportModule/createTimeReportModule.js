/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/js/application/appConfig.js":
/*!********************************************!*\
  !*** ./source/js/application/appConfig.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Timereporting_Web_appsettings_DEVELOPMENT_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../Timereporting.Web/appsettings.DEVELOPMENT.json */ "../../../Timereporting.Web/appsettings.DEVELOPMENT.json");
/* harmony import */ var _Timereporting_Web_appsettings_STAGING_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../Timereporting.Web/appsettings.STAGING.json */ "../../../Timereporting.Web/appsettings.STAGING.json");
/* harmony import */ var _Timereporting_Web_appsettings_PRODUCTION_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../Timereporting.Web/appsettings.PRODUCTION.json */ "../../../Timereporting.Web/appsettings.PRODUCTION.json");




const Environment = "DEVELOPMENT";

const getConfigurationByEnvironment = (environment) => {
  switch (environment) {
    case 'DEVELOPMENT':
      return _Timereporting_Web_appsettings_DEVELOPMENT_json__WEBPACK_IMPORTED_MODULE_0__.AppConfig;
    case 'STAGING':
      return _Timereporting_Web_appsettings_STAGING_json__WEBPACK_IMPORTED_MODULE_1__.AppConfig;
    case 'PRODUCTION':
      return _Timereporting_Web_appsettings_PRODUCTION_json__WEBPACK_IMPORTED_MODULE_2__.AppConfig;
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
};

class AppConfig {
  constructor() {
    this.config = null;
    this.loadConfig();
  }

  loadConfig() {
    const environmentConfig = getConfigurationByEnvironment(Environment);
    this.config = { ...this.config, ...environmentConfig };
  }

  getAppBaseName() {
    return this.config.AppBaseName;
  }

  getAppBaseUrl() {
    return this.config.AppBaseUrl;
  }

  getAppEnvironment() {
    return this.config.AppEnvironment;
  }

  getAppLogLevel() {
    return this.config.AppLogLevel;
  }

  getAppVersion() {
    return this.config.AppVersion;
  }

  getAppResourceHostingUrl() {
    return this.config.AppResourceHostingUrl;
  }

  getAppImageFileDirectory() {
    return this.config.AppImageFileDirectory;
  }

  getApiBaseName() {
    return this.config.ApiBaseName;
  }

  getApiBaseUrl() {
    return this.config.ApiBaseUrl;
  }

  getApiAuthorizationKey() {
    return this.config.ApiAuthorizationKey;
  }

  getApiVersion() {
    return this.config.ApiVersion;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new AppConfig());


/***/ }),

/***/ "./source/js/infrastructure/filesystem/imageProcessing.js":
/*!****************************************************************!*\
  !*** ./source/js/infrastructure/filesystem/imageProcessing.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ImageProcessing {
  // Function to open the image file dialog
  openImageFileDialog() {
    document.getElementById('image-input').click();
  }
  
  // Function to preview the image
  previewImage(event) {
    document.getElementById("image-preview").src = URL.createObjectURL(event.target.files[0]);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageProcessing);


/***/ }),

/***/ "./source/js/presentation/timereporting.web/views/shared/appModalPresenter.js":
/*!************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.web/views/shared/appModalPresenter.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
class AppModalPresenter {
    showFailureModal(delay) {
      $('#submission-failed-modal').fadeIn();
      setTimeout(function() {
        $('#submission-failed-modal').modal('hide');
      }, delay);
    }
  
    showSuccessModal(modalId, delay) {
      $('#submission-successful-modal').fadeIn();
      setTimeout(function() {
        $('#submission-successful-modal').modal('hide');
      }, delay);
    }
  }
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppModalPresenter);
  

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ }),

/***/ "../../../Timereporting.Web/appsettings.DEVELOPMENT.json":
/*!***************************************************************!*\
  !*** ../../../Timereporting.Web/appsettings.DEVELOPMENT.json ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"AppConfig":{"AppBaseName":"Timereports.Web","AppBaseUrl":"http://localhost:5001","AppEnvironment":"DEVELOPMENT","AppLogLevel":"Info","AppVersion":"1.0.0","AppResourceHostingUrl":"","AppImageFileDirectory":"Resource/Images","ApiBaseName":"Timereports.Api","ApiBaseUrl":"https://arbetsprov.trinax.se/api/v1","ApiAuthorizationKey":"212e5cedb3d8bff7e8343a38e0851da6","ApiVersion":"1.0.0"},"Logging":{"IncludeScopes":false,"LogLevel":{"Default":"Debug","System":"Information","Microsoft":"Information"}}}');

/***/ }),

/***/ "../../../Timereporting.Web/appsettings.PRODUCTION.json":
/*!**************************************************************!*\
  !*** ../../../Timereporting.Web/appsettings.PRODUCTION.json ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"AppConfig":{"AppBaseName":"Timereports.Web","AppBaseUrl":"http://timereporting.trinax.se","AppEnvironment":"PRODUCTION","AppLogLevel":"Info","AppVersion":"1.0.0","AppResourceHostingUrl":"","AppImageFileDirectory":"Resource/Images","ApiBaseName":"Timereports.Api","ApiBaseUrl":"https://arbetsprov.trinax.se/api/v1","ApiAuthorizationKey":"212e5cedb3d8bff7e8343a38e0851da6","ApiVersion":"1.0.0"},"Logging":{"LogLevel":{"Default":"Information","Microsoft.AspNetCore":"Warning"}}}');

/***/ }),

/***/ "../../../Timereporting.Web/appsettings.STAGING.json":
/*!***********************************************************!*\
  !*** ../../../Timereporting.Web/appsettings.STAGING.json ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"AppConfig":{"AppBaseName":"Timereports.Web","AppBaseUrl":"http://timereporting.staging.se","AppEnvironment":"STAGING","AppLogLevel":"Info","AppVersion":"1.0.0","AppResourceHostingUrl":"","AppImageFileDirectory":"Resource/Images","ApiBaseName":"Timereports.Api","ApiBaseUrl":"https://arbetsprov.trinax.se/api/v1","ApiAuthorizationKey":"212e5cedb3d8bff7e8343a38e0851da6","ApiVersion":"1.0.0"},"Logging":{"LogLevel":{"Default":"Information","Microsoft.AspNetCore":"Warning"}}}');

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
/*!*********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.web/views/timereport/createTimeReportModule.js ***!
  \*********************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../infrastructure/filesystem/imageProcessing */ "./source/js/infrastructure/filesystem/imageProcessing.js");
/* harmony import */ var _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/appModalPresenter */ "./source/js/presentation/timereporting.web/views/shared/appModalPresenter.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
﻿




let apiEndpoint = document.getElementById('api-endpoint').value;

async function fetchAllWorkplaces() {
  try {
    const workplaceFilter = $('#workplace-filter');
    // Fetch workplaces and fill the combo box
    const response = await fetch(`${apiEndpoint}/workplace`);
    const data = await response.json();

    // Clear existing options
    workplaceFilter.empty();

    // Add the "Get all tidrapporter" option
    const getAllOptionHTML = '<option value="0" class="get-all-option" selected>Få alla tidrapporter</option>';
    workplaceFilter.append(getAllOptionHTML);

    // Add other workplace options
    data.forEach(workplace => {
      const optionHTML = `<option value="${workplace.id}">${workplace.name}</option>`;
      workplaceFilter.append(optionHTML);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

const imageProcessing = new _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_1__["default"]();
const appModalPresenter = new _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_2__["default"]();

const selectedApiEndpoint = document.getElementById('api-endpoint').value;
const authorizationKey= `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey()}`;

// Function to open the image file dialog
window.openImageFileDialog = imageProcessing.openImageFileDialog;

// Attach click event listener to the image preview
$('#image-preview').on('click', openImageFileDialog);

// Function to preview the image
window.previewImage = imageProcessing.previewImage;

// Attach change event listener to the image input field
$('#image-input').on('change', previewImage);

$('#api-endpoint').on('change', function() {
  const selectedIndex = this.selectedIndex;
  const workplaceFilter = $('#workplace-filter');
  
  if (selectedIndex !== 0) {
    apiEndpoint = document.getElementById('api-endpoint').value;
    const timereportingHTMLOptions = '<option value="0" class="get-all-option" selected>Få alla tidrapporter</option>';
    workplaceFilter.prepend(timereportingHTMLOptions);
    fetchAllWorkplaces();
  } else {
    apiEndpoint = document.getElementById('api-endpoint').value;
    window.location.reload();
  }
});

// Function to determine whether to submit to Trinax API
function shouldSubmitToTrinaxApi() {
  return $('#api-endpoint')[0].selectedIndex === 0;
}

// Function to handle form submission
function submitTimereportForm(event) {
  event.preventDefault();
  var form = $('#create-timereport-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    // Call the appropriate submitTimereport function based on the condition
    if (shouldSubmitToTrinaxApi()) {
      submitTimereportToTrinaxApi();
    } else {
      submitTimereportToEnhancedApi();
    }
  }
}

// Function to submit the timereport
function submitTimereport(url, headers) {
  var formData = new FormData();
  formData.append('workplaceId', $('#workplace-filter').val());
  formData.append('date', $('#date').val());
  formData.append('hours', $('#hours').val());
  formData.append('info', $('#info').val());
  formData.append('imageFile', $('#image-input')[0].files[0]);

  $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    url: url,
    headers: headers,
    data: formData,
    success: function() {
      // Handle success
      $('#workplace-filter').val('0');
      $('#date').val('');
      $('#hours').val('');
      $('#info').val('');
      $('#image-input').val('');
      $('.success').html('Tidsrapporten har skickats framgångsrikt!');
      appModalPresenter.showSuccessModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 3500);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(3000);
      $('.error').html('Något gick fel. Vänligen försök igen senare.');
    }
  });
}

// Function to submit timereport to Trinax API
function submitTimereportToTrinaxApi() {
  var url = `${apiEndpoint}/timereport`;
  var headers = {
    'Authorization': `bearer ${authorizationKey}`,
    'Accept': 'application/json'
  };

  submitTimereport(url, headers);
}

// Function to submit timereport as a Enhanced
function submitTimereportToEnhancedApi() {
  var url = `${apiEndpoint}/timereport`;
  var headers = {};

  submitTimereport(url, headers);
}

// Event listener for submit button click
$('#submit-button').on('click', submitTimereportForm);
})();

/******/ })()
;
//# sourceMappingURL=createTimeReportModule.js.map