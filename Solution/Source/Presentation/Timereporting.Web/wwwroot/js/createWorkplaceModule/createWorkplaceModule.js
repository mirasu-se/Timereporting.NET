/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/infrastructure/filesystem/imageProcessing.js":
/*!*************************************************************!*\
  !*** ./src/js/infrastructure/filesystem/imageProcessing.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class imageProcessing {
  // Function to open the image file dialog
  static openImageFileDialog() {
    document.getElementById('image').click();
  }

  // Function to preview the image
  static previewImage(event) {
    document.getElementById("image-preview").src = URL.createObjectURL(event.target.files[0]);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imageProcessing);

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
/*!**********************************************************************!*\
  !*** ./src/js/presentation/views/workplace/createWorkplaceModule.js ***!
  \**********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../infrastructure/filesystem/imageProcessing */ "./src/js/infrastructure/filesystem/imageProcessing.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


// Function to open the image file dialog
function openImageFileDialog() {
  _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_0__["default"].openImageFileDialog();
}

// Function to preview the image
function previewImage(event) {
  _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_0__["default"].previewImage(event);
}

// Function to show the failure modal
function showModal(modalId, delay) {
  $('#' + modalId).fadeIn();
  setTimeout(function () {
    $('#' + modalId).modal('hide');
  }, delay);
}
function submitWorkplaceForm() {
  $('#create-workplace-form').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    form.validate();
    if (!form.valid()) {
      return;
    } else {
      var formData = new FormData();
      formData.append('name', $('#name').val());
      formData.append('info', $('#info').val());
      formData.append('imageFile', $('#image')[0].files[0]);
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url: 'http://localhost:5000/api/v1/workplace',
        data: formData,
        success: function () {
          $('#name').val('');
          $('#info').val('');
          $('#image').val('');
          $('.success').html('Arbetsplatsen har skickats framgångsrikt!!');
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        },
        error: function () {
          $('.error').html('Något gick fel. Vänligen försök igen senare.');
        }
      });
    }
  });
}
;

// Expose functions to the global scope
window.previewImage = previewImage;
window.openImageFileDialog = openImageFileDialog;
window.submitWorkplaceForm = submitWorkplaceForm;
window.showModal = showModal;
})();

/******/ })()
;
//# sourceMappingURL=createWorkplaceModule.js.map