/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./source/sass/applicationCommon.scss":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./source/sass/applicationCommon.scss ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./source/sass/applicationCommon.scss":
/*!********************************************!*\
  !*** ./source/sass/applicationCommon.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./applicationCommon.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./source/sass/applicationCommon.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

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

/***/ "./source/js/application/environment/appEnvironmentResolver.js":
/*!*********************************************************************!*\
  !*** ./source/js/application/environment/appEnvironmentResolver.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../appIdentityCore */ "./source/js/application/appIdentityCore.js");
/* harmony import */ var _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../application/logging/appLogger */ "./source/js/application/logging/appLogger.js");



const appBaseName = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppBaseName();
const appVersion = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppVersion();
const appLogLevel = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppLogLevel();
const appEnvironment = _appIdentityCore__WEBPACK_IMPORTED_MODULE_0__["default"].getAppEnvironment();

class appEnvironmentResolver {
  static configureEnvironment() {
    let isDevelopmentConfigured = false; 
    let isStaggingConfigured = false; 
    let isProductionConfigured = false; 

    switch (appEnvironment) {
      // Configure functionality for the development environment
      case 'DEVELOPMENT':
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`[${appLogLevel}] - Hello dev, welcome to ${appBaseName} ${appVersion}, you are running in [${appEnvironment}] environment. Happy coding!`, false);
         // In this environment application will display console logs      
        // Add logic to configure development environment
         // ...........ADD YOUR CODE HERE.................

        isDevelopmentConfigured = true;
        if(isDevelopmentConfigured === true){
          _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`${appEnvironment} configuration has been initialized succesfuly!`, true);
        }
        else{
          _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`Something went wrong while initializing ${appEnvironment} configuration!`, true);
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
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`${appBaseName} is currently running in [${appEnvironment}] environment!`, false);
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`[${appLogLevel}] All modules and styles are compressed!`, false);
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`[${appLogLevel}] Initializing [${appEnvironment}] configuration...`, false);
        // Configure functionality for the production environment
        break;
      default:
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`Unknown environment: ${appEnvironment}`, false);
        _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_1__["default"].logMessage(`[${appLogLevel}] Initializing configuration for unknown environment...`, false);
        // Default case for unknown environments
        break;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appEnvironmentResolver);


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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./source/js/applicationCommon.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_applicationCommon_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/applicationCommon.scss */ "./source/sass/applicationCommon.scss");
/* harmony import */ var _application_appIdentityCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./application/appIdentityCore */ "./source/js/application/appIdentityCore.js");
/* harmony import */ var _application_logging_appLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application/logging/appLogger */ "./source/js/application/logging/appLogger.js");
/* harmony import */ var _application_environment_appEnvironmentResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application/environment/appEnvironmentResolver */ "./source/js/application/environment/appEnvironmentResolver.js");
// Import common application styles

// Import application identity core from appIdentityCore.js

// Import application logger from appLogger.js




// Invoke the AppEnvironmentServices to resolve environment configuration 
_application_environment_appEnvironmentResolver__WEBPACK_IMPORTED_MODULE_3__["default"].configureEnvironment();


const appBaseName = _application_appIdentityCore__WEBPACK_IMPORTED_MODULE_1__["default"].getAppBaseName();
const appVersion = _application_appIdentityCore__WEBPACK_IMPORTED_MODULE_1__["default"].getAppVersion();
const appEnvironment = _application_appIdentityCore__WEBPACK_IMPORTED_MODULE_1__["default"].getAppEnvironment();

const module = "applicationCommon.js";
const moduleLocation = "source/js/applicationCommon.js";

// Log informative information using appLogger
_application_logging_appLogger__WEBPACK_IMPORTED_MODULE_2__["default"].logMessage(`Application Registered: ${appBaseName} v ${appVersion}`, true);
_application_logging_appLogger__WEBPACK_IMPORTED_MODULE_2__["default"].logMessage(`Application Environment: ${appEnvironment}`, true);
_application_logging_appLogger__WEBPACK_IMPORTED_MODULE_2__["default"].logMessage(`Module Registered: ${module}`, true);
_application_logging_appLogger__WEBPACK_IMPORTED_MODULE_2__["default"].logMessage(`Module Location: ${moduleLocation}`, true);

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


})();

/******/ })()
;
//# sourceMappingURL=applicationCommon.js.map