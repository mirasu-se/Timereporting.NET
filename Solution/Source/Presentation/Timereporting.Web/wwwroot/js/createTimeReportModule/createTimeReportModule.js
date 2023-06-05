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

/***/ "./source/js/presentation/timereporting.api/clients/fallbackApiClient.js":
/*!*******************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/clients/fallbackApiClient.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FallbackApiClient {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async sendRequest(method, path, data = null) {
    const url = `${this.apiBaseUrl}${path}`;
    const headers = {};

    if (data) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  }

  async get(path) {
    return this.sendRequest('GET', path);
  }

  async post(path, data) {
    return this.sendRequest('POST', path, data);
  }

  async put(path, data) {
    return this.sendRequest('PUT', path, data);
  }

  async delete(path) {
    return this.sendRequest('DELETE', path);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackApiClient);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/clients/trinaxApiClient.js":
/*!*****************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/clients/trinaxApiClient.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TrinaxApiClient {
    constructor(apiBaseUrl, authorizationToken) {
      this.apiBaseUrl = apiBaseUrl;
      this.authorizationToken = authorizationToken;
    }
  
    async sendRequest(method, path, data = null) {
      const url = `${this.apiBaseUrl}${path}`;
      const headers = {
        'Authorization': `bearer ${this.authorizationToken}`,
        'Accept': 'application/json'
      };
  
      if (data) {
        headers['Content-Type'] = 'application/json';
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    }
  
    async get(path) {
      return this.sendRequest('GET', path);
    }
  
    async post(path, data) {
      return this.sendRequest('POST', path, data);
    }
  }

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxApiClient);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/handlers/selectedApiEndpointHandler.js":
/*!*****************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/handlers/selectedApiEndpointHandler.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clients/trinaxApiClient */ "./source/js/presentation/timereporting.api/clients/trinaxApiClient.js");
/* harmony import */ var _services_trinaxApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/trinaxApiService */ "./source/js/presentation/timereporting.api/services/trinaxApiService.js");
/* harmony import */ var _presenters_trinaxTimereportDataPresenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presenters/trinaxTimereportDataPresenter */ "./source/js/presentation/timereporting.api/presenters/trinaxTimereportDataPresenter.js");
/* harmony import */ var _presenters_trinaxWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presenters/trinaxWorkplaceDataPresenter */ "./source/js/presentation/timereporting.api/presenters/trinaxWorkplaceDataPresenter.js");
/* harmony import */ var _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../clients/fallbackApiClient */ "./source/js/presentation/timereporting.api/clients/fallbackApiClient.js");
/* harmony import */ var _services_fallbackApiService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/fallbackApiService */ "./source/js/presentation/timereporting.api/services/fallbackApiService.js");
/* harmony import */ var _presenters_fallbackTimereportDataPresenter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../presenters/fallbackTimereportDataPresenter */ "./source/js/presentation/timereporting.api/presenters/fallbackTimereportDataPresenter.js");
/* harmony import */ var _presenters_fallbackWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../presenters/fallbackWorkplaceDataPresenter */ "./source/js/presentation/timereporting.api/presenters/fallbackWorkplaceDataPresenter.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");












// Class definition
class SelectedApiEndpointHandler {
  constructor(apiEndpoint, endpointElementId, workplaceFilterElementId) {
    this.apiEndpoint = apiEndpoint;
    this.workplaceFilter = $(`#${workplaceFilterElementId}`);

    this.initializeServices();
    this.bindEndpointChangeHandler(endpointElementId);
  }

  // Initialize services based on the selected API endpoint
  initializeServices() {
    if (this.apiEndpoint === _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiBaseUrl()) {
      this.trinaxTimereportDataPresenter = new _presenters_trinaxTimereportDataPresenter__WEBPACK_IMPORTED_MODULE_3__["default"](this.apiEndpoint);
      this.trinaxWorkplaceDataPresenter = new _presenters_trinaxWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_4__["default"](this.apiEndpoint);
      this.trinaxApiService = new _services_trinaxApiService__WEBPACK_IMPORTED_MODULE_2__["default"](this.apiEndpoint);
      this.createWorkplaceOptionsTrinax();
    } else {
      this.fallbackTimereportDataPresenter = new _presenters_fallbackTimereportDataPresenter__WEBPACK_IMPORTED_MODULE_7__["default"](this.apiEndpoint);
      this.fallbackWorkplaceDataPresenter = new _presenters_fallbackWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_8__["default"](this.apiEndpoint);
      this.fallbackApiService = new _services_fallbackApiService__WEBPACK_IMPORTED_MODULE_6__["default"](this.apiEndpoint);
      this.createWorkplaceOptionsFallback();
    }
  }

  // Bind the change event handler to the API endpoint selection element
  bindEndpointChangeHandler(endpointElementId) {
    $(`#${endpointElementId}`).on('change', () => {
      this.apiEndpoint = document.getElementById(endpointElementId).value;

      if (this.apiEndpoint === _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiBaseUrl()) {
        this.initializeTrinaxServices();
        this.createWorkplaceOptionsTrinax();
      } else {
        this.initializeFallbackServices();
        this.createWorkplaceOptionsFallback();
      }
    });
  }

  // Initialize Trinax services
  initializeTrinaxServices() {
    this.trinaxApiClient = new _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](this.apiEndpoint);
    this.trinaxApiService = new _services_trinaxApiService__WEBPACK_IMPORTED_MODULE_2__["default"](this.apiEndpoint);
  }

  // Initialize Fallback services
  initializeFallbackServices() {
    this.fallbackApiClient = new _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_5__["default"](this.apiEndpoint);
    this.fallbackApiService = new _services_fallbackApiService__WEBPACK_IMPORTED_MODULE_6__["default"](this.apiEndpoint);
  }

  // Update the API endpoint
  updateEndpoint(newApiEndpoint) {
    this.apiEndpoint = newApiEndpoint;
  }

  // Create workplace options based on the selected API endpoint
  async createWorkplaceOptionsTrinax() {
      const workplaceFilter = this.workplaceFilter; 
      try {
        let workplaces;
        workplaces = await this.trinaxApiService.getAllWorkplacesTrinax();
        this.trinaxApiService.createSelectOptionsTrinax(workplaces, workplaceFilter);
      } catch (error) {
        console.log(error);
      }
    }

  // Create workplace options based on the selected API endpoint
  async createWorkplaceOptionsFallback() {
    const workplaceFilter = this.workplaceFilter;

    try {
      let workplaces;
      workplaces = await this.fallbackApiService.getAllWorkplacesFallback();
      this.fallbackApiService.createSelectOptionsFallback(workplaces, workplaceFilter);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle API requests based on the selected API endpoint "workplace"
  async handleWorkplaceApiRequests() {
    if (this.apiEndpoint === _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiBaseUrl()) {
      return this.trinaxApiService.handleTrinaxApiWorkplaceRequests();
    } else {
      return this.fallbackApiService.handleFallbackApiWorkplaceRequests();
    }
  }

  // Handle API requests based on the selected API endpoint "timereport"
  async handleTimereportApiRequests(fromDate, toDate, workplaceId) {
    if (this.apiEndpoint === _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiBaseUrl()) {
      return this.trinaxApiService.handleTrinaxApiTimereportRequests(fromDate, toDate, workplaceId);
    } else {
      return this.fallbackApiService.handleFallbackApiTimereportRequests(fromDate, toDate, workplaceId);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectedApiEndpointHandler);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/interfaces/fallbackTimereportApi.js":
/*!**************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/interfaces/fallbackTimereportApi.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FallbackTimereportApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getTimereportsByAllWorkplaces() {
    try {
      const path = "/timereport";
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceId(workplaceId) {
    try {
      const path = "/timereport";
      const queryString = `workplace=${workplaceId}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportByTimereportId(reportId) {
    try {
      const path = `/timereport/${reportId}`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error('Error fetching report data:', error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    try {
      const path = "/timereport";
      const queryString = `workplace=${workplaceId}&from_date=${fromDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    try {
      const path = "/timereport";
      const queryString = `workplace=${workplaceId}&to_date=${toDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate) {
    try {
      const path = "/timereport";
      const queryString = `workplace=${workplaceId}&from_date=${fromDate}&to_date=${toDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate) {
    try {
      const path = "/timereport";
      const queryString = `from_date=${fromDate}&to_date=${toDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByAllWorkplacesAndFromDate(fromDate) {
    try {
      const path = "/timereport";
      const queryString = `from_date=${fromDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }

  async getTimereportsByAllWorkplacesAndToDate(toDate) {
    try {
      const path = "/timereport";
      const queryString = `to_date=${toDate}`;
      const response = await this.apiClient.get(`${path}?${queryString}`);
      return response;
    } catch (error) {
      console.error("Error fetching timereports:", error);
      return null;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackTimereportApi);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/interfaces/fallbackWorkplaceApi.js":
/*!*************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/interfaces/fallbackWorkplaceApi.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FallbackWorkplaceApi {
    constructor(apiClient) {
      this.apiClient = apiClient;
    }
  
    async getAllWorkplaces() {
      const path = '/workplace';
      return this.apiClient.get(path);
    }

    async getWorkplaceById(workplaceId) {
      const path = `/workplace/${encodeURIComponent(workplaceId)}`;
      return this.apiClient.get(path);
    }    
  }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackWorkplaceApi);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/interfaces/trinaxTimereportApi.js":
/*!************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/interfaces/trinaxTimereportApi.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TrinaxTimereportApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAllTimereports() {
    try {
      const path = `/timereport`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching all timereports:", error);
      return null;
    }
  }

  async getTimereportByWorkplaceId(id) {
    try {
      const path = `/timereport/${encodeURIComponent(id)}`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching timereport:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceId(id) {
    try {
      const path = '/timereport';
      const timereports = await this.apiClient.get(path);

      if (parseInt(id) === 0) {
        return timereports;
      }
      else {
        return timereports.filter(report => report.workplace_id === parseInt(id));
      }
    } catch (error) {
      console.error("Error fetching timereports by workplace ID:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, toDate) {
    try {
      const filters = {
        from_date: encodeURIComponent(fromDate),
        to_date: encodeURIComponent(toDate)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching timereports by date range:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    try {
      const now = new Date().toISOString().split('T')[0];
      return await this.getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, now);
    } catch (error) {
      console.error("Error fetching timereports from date:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    try {
      const startOfTime = new Date(0).toISOString().slice(0, 10);
      return await this.getTimereportsByWorkplaceIdAndDateRange(workplaceId, startOfTime, toDate);
    } catch (error) {
      console.error("Error fetching timereports to date:", error);
      return null;
    }
  }

  async createTimereport(data) {
    try {
      const path = '/timereport';
      const response = await this.apiClient.post(path, data);
      return response;
    } catch (error) {
      console.error("Error creating timereport:", error);
      return null;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxTimereportApi);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/interfaces/trinaxWorkplaceApi.js":
/*!***********************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/interfaces/trinaxWorkplaceApi.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TrinaxWorkplaceApi {
    constructor(apiClient) {
      this.apiClient = apiClient;
    }
  
    async getAllWorkplaces() {
      const path = '/workplace';
      return this.apiClient.get(path);
    }

    async getWorkplaceById(workplaceId) {
      const path = `/workplace/${encodeURIComponent(workplaceId)}`;
      return this.apiClient.get(path);
    }    
  }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxWorkplaceApi);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/presenters/fallbackTimereportDataPresenter.js":
/*!************************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/presenters/fallbackTimereportDataPresenter.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clients/fallbackApiClient */ "./source/js/presentation/timereporting.api/clients/fallbackApiClient.js");
/* harmony import */ var _interfaces_fallbackWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interfaces/fallbackWorkplaceApi */ "./source/js/presentation/timereporting.api/interfaces/fallbackWorkplaceApi.js");




const selectedApiEndpoint = `http://localhost:5000/api/v1`;
const fallbackApiClient = new _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](selectedApiEndpoint);
const fallbackWorkplaceApi = new _interfaces_fallbackWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__["default"](fallbackApiClient);

class FallbackTimereportDataPresenter {
  presentTableRows(data) {
    if(data != null){
      console.log("[API RESPONSE]:", data);
      // Sort the data by report.id in descending order
      // Last report should be displayed at the top for better UI/UX functionality
      data.sort((b, a) => a.id - b.id);
    
      // Clean the time-report-table by removing all existing rows
      const tableBody = document.querySelector("#time-report-table tbody");
      tableBody.innerHTML = "";
    
      // create new table rows based on the fetched data
      data.forEach(async (report) => {
        const workplace = await fallbackWorkplaceApi.getWorkplaceById(report.workplaceId);
        const row = `<tr>
          <td>${new Date(report.date).toISOString().split('T')[0]}</td>
          <td>${workplace.name}</td>
          <td>${report.hours.toFixed(2)}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }
  }
  
  presentDetailsModal(data) {
    if(data != null){
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";
    
      data.forEach(async (report) => {
        const imgSrc = report.imageUrl ? `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getAppResourceHostingUrl() + report.imageUrl}` : "/img/default/timereport/no_time_report_image.png";
        const workplace = await fallbackWorkplaceApi.getWorkplaceById(report.workplaceId);
        const modal = `
        <div id="modal-container"> 
          <div class="modal fade" id="timereportDetails_${report.id}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="timereportModalLabel">
                    Tidsrapportdetaljer [FALLBACK]
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                </div>
                <div class="card">
                  <div class="card-body">
                    <p id="id"><strong>RAPPORT ID -</strong> ${report.id}</p>
                    <p id="workplace"><strong>Arbetsplats Id:</strong> ${report.workplaceId}</p>
                    <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                    <p id="date"><strong>Datum:</strong> ${new Date(report.date).toISOString().split('T')[0]}</p>
                    <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours.toFixed(2)}</p>
                    <p id=""><strong>Info:</strong> ${report.info}</p>
                    <div class="text-center">
                      <img src="${imgSrc}" alt="Timereport image attachment" class="img-fluid">
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
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackTimereportDataPresenter);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/presenters/fallbackWorkplaceDataPresenter.js":
/*!***********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/presenters/fallbackWorkplaceDataPresenter.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


class FallbackWorkplaceDataPresenter {
  async presentSelectOptions(data, selectElement) {
    if(data != null){
      selectElement.empty();
      // Add options for each workplace
      for (const workplace of data) {
        selectElement.append($('<option>', {
          value: workplace.workplaceId,
          text: workplace.name,
        }));
      }
    }
  }

  async presentTableRows(data) {
    if(data != null){
      console.log("[API RESPONSE]:", data);
      // Sort the data by workplace.id in descending order
      // Last added workplace should be displayed at the top for better UI/UX functionality
      data.sort((b, a) => a.id - b.id);
      
      // Clean the workplace-table by removing all existing rows
      const tableBody = document.querySelector("#workplace-table tbody");
      tableBody.innerHTML = "";
      
      // Fetch workplace data and create new table rows based on the fetched data
      for (const workplace of data) {
        const row = `<tr>
          <td>${workplace.id}</td>
          <td>${workplace.name}</td>
          <td>${workplace.createdTimeString}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#workplaceDetails_${workplace.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      }
    }
  }
    
  presentDetailsModal(data) {
  if(data != null){
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";
      
      data.forEach(async (workplace) => {
        let imgSrc = workplace.imageUrl ? `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getAppResourceHostingUrl() + workplace.imageUrl}` : "/img/default/workplace/no_workplace_image.png";
        const modal = `
          <div id="modal-container"> 
            <div class="modal fade" id="workplaceDetails_${workplace.id}" tabindex="-1" aria-labelledby="workplaceModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="workplaceModalLabel">
                      Tidsrapportdetaljer [FALLBACK]
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p id="workplace"><strong>Arbetsplats Seq:</strong> ${workplace.id}</p>
                      <p id="workplace"><strong>Arbetsplats Id:</strong> ${workplace.workplaceId}</p>
                      <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                      <p id="date"><strong>Skapade tid:</strong> ${workplace.createdTimeString}</p>
                      <div class="text-center">
                      <img src="${imgSrc}" alt="Timereport image attachment" class="img-fluid">
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
  }
}
  
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackWorkplaceDataPresenter);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/presenters/trinaxTimereportDataPresenter.js":
/*!**********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/presenters/trinaxTimereportDataPresenter.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clients/trinaxApiClient */ "./source/js/presentation/timereporting.api/clients/trinaxApiClient.js");
/* harmony import */ var _interfaces_trinaxWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interfaces/trinaxWorkplaceApi */ "./source/js/presentation/timereporting.api/interfaces/trinaxWorkplaceApi.js");




const selectedApiEndpoint = document.getElementById('api-endpoint').value;
const authorizationKey = `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey()}`;
const trinaxApiClient = new _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](selectedApiEndpoint, authorizationKey);
const trinaxWorkplaceApi = new _interfaces_trinaxWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__["default"](trinaxApiClient);

class TrinaxTimereportDataPresenter {
  async presentTableRows(data) {
    if(data != null){
      console.log("[API RESPONSE]:", data);
      // Sort the data by report.id in descending order
      // Last report should be displayed at the top for better UI/UX functionality
      data.sort((b, a) => a.id - b.id);
      
      // Clean the time-report-table by removing all existing rows
      const tableBody = document.querySelector("#time-report-table tbody");
      tableBody.innerHTML = "";
      
      // Fetch workplace data for each report and create new table rows based on the fetched data
      for (const report of data) {
        const workplace = await trinaxWorkplaceApi.getWorkplaceById(report.workplace_id);
        const row = `<tr>
          <td>${report.date}</td>
          <td>${workplace.name}</td>
          <td>${report.hours}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#timereportDetails_${report.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      }
    }
  }
  
 presentDetailsModal(data) {
  if(data != null){
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";  
      data.forEach(async (report) => {
      // Since Arbetsplatsnamn is required (according to email instructions)  and not avilible by default in direct timereport reponse we will fatch it from workplaceApi
      // We are here in a forEach loop which means that this will execute asyncronuse calls on workplace endpoint only to get workplace name
      // This should make a lot of unnecessary requests on our API and in reality we should eather expand table columns in our database 
      // or if columns already exists we should reconfigure timereport API controller to expose requred data property in the API interface by sql join statement on backend side
      // or in some other case use caching technology like Redis database to lower down number of requests to our API
      const workplace = await trinaxWorkplaceApi.getWorkplaceById(report.workplace_id);
        const modal = `
          <div id="modal-container"> 
            <div class="modal fade" id="timereportDetails_${report.id}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="timereportModalLabel">
                      Tidsrapportdetaljer [TRINAX]
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p id="id"><strong>RAPPORT ID -</strong> ${report.id}</p>
                      <p id="workplace"><strong>Arbetsplats Id:</strong> ${workplace.id}</p>
                      <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                      <p id="date"><strong>Datum:</strong> ${report.date}</p>
                      <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours}</p>
                      <p id=""><strong>Info:</strong> ${report.info}</p>
                      <div class="text-center">
                        <img src="${report.imageUrl ? `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getAppResourceHostingUrl() + report.imageUrl}` : "img/default/timereport/no_time_report_image.png"}" alt="Timereport image attachment" class="img-fluid">
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
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxTimereportDataPresenter);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/presenters/trinaxWorkplaceDataPresenter.js":
/*!*********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/presenters/trinaxWorkplaceDataPresenter.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
class TrinaxWorkplaceDataPresenter {
  async presentSelectOptions(data, selectElement) {
    if(data != null){
      selectElement.empty();
      // Add options for each workplace
      for (const workplace of data) {
        selectElement.append($('<option>', {
          value: workplace.id,
          text: workplace.name,
        }));
      }
    }
  }

  async presentTableRows(data) {
    if(data != null){
      console.log("[API RESPONSE]:", data);
      // Sort the data by workplace.id in descending order
      // Last added workplace should be displayed at the top for better UI/UX functionality
      data.sort((b, a) => a.id - b.id);
     
      // Clean the workplace-table by removing all existing rows
      const tableBody = document.querySelector("#workplace-table tbody");
      tableBody.innerHTML = "";
      
      // Fetch workplace data and create new table rows based on the fetched data
      for (const workplace of data) {
        const row = `<tr>
          <td>${workplace.id}</td>
          <td>${workplace.name}</td>
          <td>${workplace.created_time}</td>
          <td>
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#workplaceDetails_${workplace.id}">
              <i class="btn btn-secondary bi bi-info-circle m-0"></i>
            </button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      }
    }
  }
  
 presentDetailsModal(data) {
  if(data != null){
      const modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";     
      data.forEach(async (workplace) => {
        const modal = `
          <div id="modal-container"> 
            <div class="modal fade" id="workplaceDetails_${workplace.id}" tabindex="-1" aria-labelledby="workplaceModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="workplaceModalLabel">
                      Tidsrapportdetaljer [TRINAX]
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Stäng"></button>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p id="workplace"><strong>Arbetsplats Id:</strong> ${workplace.id}</p>
                      <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                      <p id="date"><strong>Skapade tid:</strong> ${workplace.created_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        modalContainer.insertAdjacentHTML("beforeend", modal);
      });
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxWorkplaceDataPresenter);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/services/fallbackApiService.js":
/*!*********************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/services/fallbackApiService.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clients/fallbackApiClient */ "./source/js/presentation/timereporting.api/clients/fallbackApiClient.js");
/* harmony import */ var _interfaces_fallbackTimereportApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interfaces/fallbackTimereportApi */ "./source/js/presentation/timereporting.api/interfaces/fallbackTimereportApi.js");
/* harmony import */ var _interfaces_fallbackWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interfaces/fallbackWorkplaceApi */ "./source/js/presentation/timereporting.api/interfaces/fallbackWorkplaceApi.js");
/* harmony import */ var _presenters_fallbackWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presenters/fallbackWorkplaceDataPresenter */ "./source/js/presentation/timereporting.api/presenters/fallbackWorkplaceDataPresenter.js");





class FallbackApiService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.fallbackApiClient = new _clients_fallbackApiClient__WEBPACK_IMPORTED_MODULE_0__["default"](this.apiEndpoint);
    this.fallbackTimereportApi = new _interfaces_fallbackTimereportApi__WEBPACK_IMPORTED_MODULE_1__["default"](this.fallbackApiClient);
    this.fallbackWorkplaceApi = new _interfaces_fallbackWorkplaceApi__WEBPACK_IMPORTED_MODULE_2__["default"](this.fallbackApiClient);
    this.fallbackWorkplaceDataPresenter = new _presenters_fallbackWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_3__["default"]();
  }

  async getAllWorkplacesFallback() {
    return this.fallbackWorkplaceApi.getAllWorkplaces();
  }

  createSelectOptionsFallback(workplaces, filterElement) {
    this.fallbackWorkplaceDataPresenter.presentSelectOptions(workplaces, filterElement);
  }

  async handleFallbackApiWorkplaceRequests() {
    const fallbackWorkplaceApi = this.fallbackWorkplaceApi;
    return fallbackWorkplaceApi.getAllWorkplaces();
  }  

  async handleFallbackApiTimereportRequests(fromDate, toDate, workplaceId) {
    const fallbackTimereportApi = this.fallbackTimereportApi;
    const startTime = Date.now();

    if (workplaceId) {
      if (fromDate && toDate) {
        const result = await fallbackTimereportApi.getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else if (fromDate) {
        const result = await fallbackTimereportApi.getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else if (toDate) {
        const result = await fallbackTimereportApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else {
        const result = await fallbackTimereportApi.getTimereportsByWorkplaceId(workplaceId);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      }
    } else {
      if (fromDate && toDate) {
        const result = await fallbackTimereportApi.getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else if (fromDate) {
        const result = await fallbackTimereportApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else if (toDate) {
        const result = await fallbackTimereportApi.getTimereportsByAllWorkplacesAndToDate(toDate);
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      } else {
        const result = await fallbackTimereportApi.getTimereportsByAllWorkplaces();
        const executionTime = Date.now() - startTime;
        console.log(`Execution time: ${executionTime}ms`);
        return result;
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FallbackApiService);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/services/trinaxApiService.js":
/*!*******************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/services/trinaxApiService.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clients/trinaxApiClient */ "./source/js/presentation/timereporting.api/clients/trinaxApiClient.js");
/* harmony import */ var _interfaces_trinaxTimereportApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interfaces/trinaxTimereportApi */ "./source/js/presentation/timereporting.api/interfaces/trinaxTimereportApi.js");
/* harmony import */ var _interfaces_trinaxWorkplaceApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../interfaces/trinaxWorkplaceApi */ "./source/js/presentation/timereporting.api/interfaces/trinaxWorkplaceApi.js");
/* harmony import */ var _presenters_trinaxWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presenters/trinaxWorkplaceDataPresenter */ "./source/js/presentation/timereporting.api/presenters/trinaxWorkplaceDataPresenter.js");






class TrinaxApiService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.trinaxApiClient = new _clients_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](this.apiEndpoint, _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey());
    this.trinaxTimereportApi = new _interfaces_trinaxTimereportApi__WEBPACK_IMPORTED_MODULE_2__["default"](this.trinaxApiClient);
    this.trinaxWorkplaceApi = new _interfaces_trinaxWorkplaceApi__WEBPACK_IMPORTED_MODULE_3__["default"](this.trinaxApiClient);
    this.trinaxWorkplaceDataPresenter = new _presenters_trinaxWorkplaceDataPresenter__WEBPACK_IMPORTED_MODULE_4__["default"]();
  }

  async getAllWorkplacesTrinax() {
    return this.trinaxWorkplaceApi.getAllWorkplaces();
  }

  createSelectOptionsTrinax(workplaces, filterElement) {
    this.trinaxWorkplaceDataPresenter.presentSelectOptions(workplaces, filterElement);
  }

  async handleTrinaxApiWorkplaceRequests() {
    const trinaxWorkplaceApi = this.trinaxWorkplaceApi;
    return trinaxWorkplaceApi.getAllWorkplaces();
  }  

  async handleTrinaxApiTimereportRequests(fromDate, toDate, workplaceId) {
    const trinaxTimereportApi = this.trinaxTimereportApi;

    if (workplaceId) {
      if (fromDate && toDate) {
        return trinaxTimereportApi.getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, toDate);
      } else if (fromDate) {
        return trinaxTimereportApi.getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate);
      } else if (toDate) {
        return trinaxTimereportApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate);
      } else {
        return trinaxTimereportApi.getTimereportsByWorkplaceId(workplaceId);
      }
    } else {
      if (fromDate && toDate) {
        return trinaxTimereportApi.getAllTimereports(fromDate, toDate);
      } else if (fromDate) {
        return trinaxTimereportApi.getTimereportsFromDate(fromDate);
      } else if (toDate) {
        return trinaxTimereportApi.getTimereportsToDate(toDate);
      } else {
        return trinaxTimereportApi.getAllTimereports();
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrinaxApiService);

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
    $('#submission-failed-modal').modal('show');
    setTimeout(function() {
      $('#submission-failed-modal').modal('hide');
    }, delay);
  }

  showSuccessModal(delay) {
    $('#submission-successful-modal').modal('show');
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

module.exports = JSON.parse('{"AppConfig":{"AppBaseName":"Timereports.Web","AppBaseUrl":"http://localhost:5001/","AppEnvironment":"DEVELOPMENT","AppLogLevel":"Info","AppVersion":"1.0.0","AppResourceHostingUrl":"http://localhost:5000/","AppImageFileDirectory":"Resource/Images","ApiBaseName":"Timereports.Api","ApiBaseUrl":"https://arbetsprov.trinax.se/api/v1","ApiAuthorizationKey":"212e5cedb3d8bff7e8343a38e0851da6","ApiVersion":"1.0.0"},"Logging":{"IncludeScopes":false,"LogLevel":{"Default":"Debug","System":"Information","Microsoft":"Information"}}}');

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
/* harmony import */ var _timereporting_api_handlers_selectedApiEndpointHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../timereporting.api/handlers/selectedApiEndpointHandler */ "./source/js/presentation/timereporting.api/handlers/selectedApiEndpointHandler.js");
/* harmony import */ var _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../infrastructure/filesystem/imageProcessing */ "./source/js/infrastructure/filesystem/imageProcessing.js");
/* harmony import */ var _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/appModalPresenter */ "./source/js/presentation/timereporting.web/views/shared/appModalPresenter.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
﻿





const endpointElementId = 'api-endpoint';

function getApiEndpoint() {
  return document.getElementById(endpointElementId).value;
}

$(`#${endpointElementId}`).on('change', async function() {
  const newApiEndpoint = getApiEndpoint();
  selectedApiEndpointHandler.updateEndpoint(newApiEndpoint);
});

const workplaceFilterElementId = 'workplace-filter';
const selectedApiEndpointHandler = new _timereporting_api_handlers_selectedApiEndpointHandler__WEBPACK_IMPORTED_MODULE_1__["default"](getApiEndpoint(), endpointElementId, workplaceFilterElementId);

const imageProcessing = new _infrastructure_filesystem_imageProcessing__WEBPACK_IMPORTED_MODULE_2__["default"]();
const appModalPresenter = new _shared_appModalPresenter__WEBPACK_IMPORTED_MODULE_3__["default"]();

// Attach click event listener to the image preview
$('#image-preview').on('click', imageProcessing.openImageFileDialog);

// Attach change event listener to the image input field
$('#image-input').on('change', imageProcessing.previewImage);

$('#api-endpoint').on('change', function() {
  var selectedIndex = this.selectedIndex;

  if (selectedIndex === 1) {
    $('.image-option').removeClass('hidden');
  } else {
    $('.image-option').addClass('hidden');
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
      submitTimereportToFallbackApi();
    }
  }
}

// Function to submit timereport to Trinax API
function submitTimereportToTrinaxApi() {
  var url = 'https://arbetsprov.trinax.se/api/v1/timereport';
  var headers = {
    'Authorization': `bearer ${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey()}`,
    'Accept': 'application/json'
  };

  var formData = new FormData();
  formData.append('workplace_id', $('#workplace-filter').val());
  formData.append('date', $('#date').val());
  formData.append('hours', $('#hours').val());
  formData.append('info', $('#info').val());

  $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    url: url,
    headers: headers,
    data: formData,
    success: function(response) {
      // Log response data to console
      console.log(response.id);
      submitTimereportToFallbackApi(response.id);

      // Handle success
      $('#workplace-filter').val('');
      $('#date').val('');
      $('#hours').val('');
      $('#info').val('');
      appModalPresenter.showSuccessModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 8500);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 8500);
    }
  });
}



// Function to submit timereport as a Fallback
function submitTimereportToFallbackApi(timereportId) {
  var url = `http://localhost:5000/api/v1/timereport`;
  var headers = {};

  var formData = new FormData();
  formData.append('id', timereportId);
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
      appModalPresenter.showSuccessModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 8500);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 8500);
    }
  });
}


// Event listener for submit button click
$('#submit-button').on('click', submitTimereportForm);
})();

/******/ })()
;
//# sourceMappingURL=createTimeReportModule.js.map