/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*******************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.web/views/workplace/createWorkplaceModule.js ***!
  \*******************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../infrastructure/filesystem/imageProcessing */ "./source/js/infrastructure/filesystem/imageProcessing.js");
/* harmony import */ var _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/appModalPresenter */ "./source/js/presentation/timereporting.web/views/shared/appModalPresenter.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
﻿


const imageProcessing = new _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_0__["default"]();
const appModalPresenter = new _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_1__["default"]();

// Function to open the image file dialog
window.openImageFileDialog = imageProcessing.openImageFileDialog;

// Attach click event listener to the image preview
$('#image-preview').on('click', openImageFileDialog);

// Function to preview the image
window.previewImage = imageProcessing.previewImage;

// Attach change event listener to the image input field
$('#image-input').on('change', previewImage);

$('#api-endpoint').on('change', function() {
  var selectedIndex = this.selectedIndex;

  if (selectedIndex === 0 || selectedIndex === 2) {
    $('.info-option').removeClass('hidden');
    $('.image-option').removeClass('hidden');
  } else {
    $('.info-option').addClass('hidden');
    $('.image-option').addClass('hidden');
  }
});

function shouldSubmitToTrinaxApi() {
  return $('#api-endpoint')[0].selectedIndex === 0;
}

shouldSubmitToTrinaxApi();

// Function to handle form submission
function submitWorkplaceForm(event) {
  event.preventDefault();
  var form = $('#create-workplace-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    // Call the appropriate submitWorkplace function based on the condition
    if (shouldSubmitToTrinaxApi()) {
      submitWorkplaceToTrinaxApi();
    } else {
      submitWorkplaceToFallbackApi();
    }
  }
}

// Function to submit the workplace
function submitWorkplace(url, headers) {
  var formData = new FormData();
  formData.append('name', $('#name').val());
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
      $('#name').val('');
      $('#info').val('');
      $('#image-input').val('');
      $('.success').html('Arbetsplatsen har skickats framgångsrikt!');
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

// Function to submit workplace to Trinax API
function submitWorkplaceToTrinaxApi() {
  var url = 'https://arbetsprov.trinax.se/api/v1/workplace';
  var headers = {
    'Authorization': 'bearer abc123testtoken',
    'Accept': 'application/json'
  };

  submitWorkplace(url, headers);
}

// Function to submit workplace as a fallback
function submitWorkplaceToFallbackApi() {
  var url = 'http://localhost:5000/api/v1/workplace';
  var headers = {};

  submitWorkplace(url, headers);
}

// Event listener for submit button click
$('#submit-button').on('click', submitWorkplaceForm);
})();

/******/ })()
;
//# sourceMappingURL=createWorkplaceModule.js.map