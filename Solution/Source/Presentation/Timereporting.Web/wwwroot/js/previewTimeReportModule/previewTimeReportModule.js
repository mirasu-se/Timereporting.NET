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

/***/ "./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApi.js":
/*!**********************************************************************************!*\
  !*** ./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApi.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TimereportApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAllTimereports() {
    const path = `/timereport`;
    return this.apiClient.get(path);
  }

  async getTimereportsByDateRange(fromDate, toDate) {
    const filters = {
      from_date: encodeURIComponent(fromDate),
      to_date: encodeURIComponent(toDate)
    };
    const queryString = new URLSearchParams(filters).toString();
    const path = `/timereport${queryString ? `?${queryString}` : ''}`;
    return this.apiClient.get(path);
  }

  async getTimereportsFromDate(fromDate) {
    const now = new Date().toISOString().split('T')[0];
    return this.getTimereportsByDateRange(fromDate, now);
  }

  async getTimereportsToDate(toDate) {
    const startOfTime = new Date(0).toISOString().slice(0, 10);
    return this.getTimereportsByDateRange(startOfTime, toDate);
  }

  async getAllTimereportsWithDateFilter(fromDate, toDate) {
    if (fromDate && toDate) {
      return this.getTimereportsByDateRange(fromDate, toDate);
    } else if (fromDate) {
      return this.getTimereportsFromDate(fromDate);
    } else if (toDate) {
      return this.getTimereportsToDate(toDate);
    } else {
      return this.getAllTimereports();
    }
  }

  async getTimereport(id) {
    const path = `/timereport/${encodeURIComponent(id)}`;
    return this.apiClient.get(path);
  }

  async createTimereport(data) {
    const path = '/timereport';
    return this.apiClient.post(path, data);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportApi);

/***/ }),

/***/ "./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApiService.js":
/*!*****************************************************************************************!*\
  !*** ./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApiService.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _workplace_workplaceApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../workplace/workplaceApi */ "./source/js/presentation/arbetsprov.trinax.api/workplace/workplaceApi.js");
/* harmony import */ var _trinaxApiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trinaxApiClient */ "./source/js/presentation/arbetsprov.trinax.api/trinaxApiClient.js");




const selectedApiEndpoint = document.getElementById('api-endpoint').value;
const authorizationKey = `${_application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey()}`;
const trinaxApiClient = new _trinaxApiClient__WEBPACK_IMPORTED_MODULE_2__["default"](selectedApiEndpoint, authorizationKey);
const workplaceApi = new _workplace_workplaceApi__WEBPACK_IMPORTED_MODULE_1__["default"](trinaxApiClient);

class TimereportApiService {
  async createTimereportTableRows(data) {
    console.log("[API RESPONSE]:", data);
    // Sort the data by report.id in descending order
    // Last report should be displayed at the top for better UI/UX functionality
    data.sort((b, a) => a.id - b.id);
    
    // Clean the time-report-table by removing all existing rows
    const tableBody = document.querySelector("#time-report-table tbody");
    tableBody.innerHTML = "";
    
    // Fetch workplace data for each report and create new table rows based on the fetched data
    for (const report of data) {
      const workplace = await workplaceApi.getWorkplaceById(report.workplace_id);
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
  
 createTimereportDetailsModal(data) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
    
    data.forEach(async (report) => {
    // Since Arbetsplatsnamn is required (according to email instructions)  and not avilible by default in direct timereport reponse we will fatch it from workplaceApi
    // We are here in a forEach loop which means that this will execute asyncronuse calls on workplace endpoint only to get workplace name
    // This should make a lot of unnecessary reqwuests on our API and in reality we should eaither expand table columns in our database 
    // or if columns already exists we should reconfigure timereport API controller to expose requred data property in the API interface
    const workplace = await workplaceApi.getWorkplaceById(report.workplace_id);
      const modal = `
        <div id="modal-container"> 
          <div class="modal fade" id="timereportDetails_${report.id}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
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
                    <p id="id"><strong>RAPPORT ID -</strong> ${report.id}</p>
                    <p id="workplace"><strong>Arbetsplats Id:</strong> ${report.workplaceId}</p>
                    <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                    <p id="date"><strong>Datum:</strong> ${report.date}</p>
                    <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours}</p>
                    <p id=""><strong>Info:</strong> ${report.info}</p>
                    <div class="text-center">
                      <img src="${report.imageFile || '/img/default/timereport/no_time_report_image.png'}" alt="Workplace Image" class="img-fluid">
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportApiService);

/***/ }),

/***/ "./source/js/presentation/arbetsprov.trinax.api/trinaxApiClient.js":
/*!*************************************************************************!*\
  !*** ./source/js/presentation/arbetsprov.trinax.api/trinaxApiClient.js ***!
  \*************************************************************************/
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

/***/ "./source/js/presentation/arbetsprov.trinax.api/workplace/workplaceApi.js":
/*!********************************************************************************!*\
  !*** ./source/js/presentation/arbetsprov.trinax.api/workplace/workplaceApi.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class WorkplaceApi {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkplaceApi);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/timereport/timereportingApi.js":
/*!*********************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/timereport/timereportingApi.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timereport_timereportingApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../timereport/timereportingApiService */ "./source/js/presentation/timereporting.api/timereport/timereportingApiService.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


const timereportingApiService = new _timereport_timereportingApiService__WEBPACK_IMPORTED_MODULE_0__["default"]();

class TimereportingApi {
    constructor(apiClient) {
      this.apiClient = apiClient;
    }
  
    async getTimereportsByAllWorkplaces() {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceId(workplaceId) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportByTimereportId(reportId) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport/${reportId}`);
        const data = await response.json();
        // Update the modal with the fetched report data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
        // Show the modal
        $(`#reportDetails_${reportId}`).modal('show');
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    }
  
    async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&to_date=${toDate}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}&to_date=${toDate}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching timereports:", error);
        return null;
      }
    }
  
    async getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}&to_date=${toDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    
      async getTimereportsByAllWorkplacesAndFromDate(fromDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    
      async getTimereportsByAllWorkplacesAndToDate(toDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?to_date=${toDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    }
    
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportingApi);
    
  

/***/ }),

/***/ "./source/js/presentation/timereporting.api/timereport/timereportingApiService.js":
/*!****************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/timereport/timereportingApiService.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timereporting_api_workplace_timereportingWorkplaceApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../timereporting.api/workplace/timereportingWorkplaceApi */ "./source/js/presentation/timereporting.api/workplace/timereportingWorkplaceApi.js");
/* harmony import */ var _timereporting_api_timereportingApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../timereporting.api/timereportingApiClient */ "./source/js/presentation/timereporting.api/timereportingApiClient.js");



const selectedApiEndpoint = "http://localhost:5000/api/v1";
const timereportingApiClient = new _timereporting_api_timereportingApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](selectedApiEndpoint);
const timereportingWorkplaceApi = new _timereporting_api_workplace_timereportingWorkplaceApi__WEBPACK_IMPORTED_MODULE_0__["default"](timereportingApiClient);

class TimereportingApiService {

  createTimereportTableRows(data) {
    console.log("[API - RESPONSE]:", data);
    // Sort the data by report.id in ascending order
    data.sort((b, a) => a.id - b.id);
  
    // Clean the time-report-table by removing all existing rows
    const tableBody = document.querySelector("#time-report-table tbody");
    tableBody.innerHTML = "";
  
    // create new table rows based on the fetched data
    data.forEach(async (report) => {
      const workplace = await timereportingWorkplaceApi.getWorkplaceById(report.workplaceId);
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
  
  createTimereportDetailsModal(data) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
  
    data.forEach(async (report) => {
      const workplace = await timereportingWorkplaceApi.getWorkplaceById(report.workplaceId);
      const modal = `
      <div id="modal-container"> 
        <div class="modal fade" id="timereportDetails_${report.id}" tabindex="-1" aria-labelledby="timereportModalLabel" aria-hidden="true">
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
                  <p id="id"><strong>RAPPORT ID -</strong> ${report.id}</p>
                  <p id="workplace"><strong>Arbetsplats Id:</strong> ${report.workplaceId}</p>
                  <p id="name"><strong>Arbetsplatsnamn:</strong> ${workplace.name}</p>
                  <p id="date"><strong>Datum:</strong> ${new Date(report.date).toISOString().split('T')[0]}</p>
                  <p id="hours"><strong>Arbetstimmar:</strong> ${report.hours.toFixed(2)}</p>
                  <p id=""><strong>Info:</strong> ${report.info}</p>
                  <div class="text-center">
                    <img src="${report.imageFile || '/img/default/timereport/no_time_report_image.png'}" alt="Workplace Image" class="img-fluid">
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportingApiService);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/timereportingApiClient.js":
/*!****************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/timereportingApiClient.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TimereportingApiClient {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportingApiClient);

/***/ }),

/***/ "./source/js/presentation/timereporting.api/workplace/timereportingWorkplaceApi.js":
/*!*****************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.api/workplace/timereportingWorkplaceApi.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TimereportingWorkplaceApi {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimereportingWorkplaceApi);

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
/*!**********************************************************************************************!*\
  !*** ./source/js/presentation/timereporting.web/views/timereport/previewTimeReportModule.js ***!
  \**********************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_appConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../application/appConfig */ "./source/js/application/appConfig.js");
/* harmony import */ var _arbetsprov_trinax_api_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../arbetsprov.trinax.api/trinaxApiClient */ "./source/js/presentation/arbetsprov.trinax.api/trinaxApiClient.js");
/* harmony import */ var _arbetsprov_trinax_api_timereport_timereportApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../arbetsprov.trinax.api/timereport/timereportApi */ "./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApi.js");
/* harmony import */ var _arbetsprov_trinax_api_timereport_timereportApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../arbetsprov.trinax.api/timereport/timereportApiService */ "./source/js/presentation/arbetsprov.trinax.api/timereport/timereportApiService.js");
/* harmony import */ var _timereporting_api_timereportingApiClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../timereporting.api/timereportingApiClient */ "./source/js/presentation/timereporting.api/timereportingApiClient.js");
/* harmony import */ var _timereporting_api_timereport_timereportingApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../timereporting.api/timereport/timereportingApi */ "./source/js/presentation/timereporting.api/timereport/timereportingApi.js");
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

const trinaxApiClient = new _arbetsprov_trinax_api_trinaxApiClient__WEBPACK_IMPORTED_MODULE_1__["default"](apiEndpoint, _application_appConfig__WEBPACK_IMPORTED_MODULE_0__["default"].getApiAuthorizationKey());
const timereportApi = new _arbetsprov_trinax_api_timereport_timereportApi__WEBPACK_IMPORTED_MODULE_2__["default"](trinaxApiClient);
const timereportApiService = new _arbetsprov_trinax_api_timereport_timereportApiService__WEBPACK_IMPORTED_MODULE_3__["default"]();

const timereportingApiClient = new _timereporting_api_timereportingApiClient__WEBPACK_IMPORTED_MODULE_4__["default"](apiEndpoint);
const timereportingApi = new _timereporting_api_timereport_timereportingApi__WEBPACK_IMPORTED_MODULE_5__["default"](timereportingApiClient, apiEndpoint);


async function fetchTimereports() {
  console.log(`We are fetching from ${apiEndpoint}`);
  try {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    const workplaceId = document.getElementById('workplace-filter').value;

    let timereports;

    if (apiEndpoint === "https://arbetsprov.trinax.se/api/v1") {
      // Use Trinax API for fetching data from Trinax database
      if (fromDate && toDate) {
        timereports = await timereportApi.getTimereportsByDateRange(fromDate, toDate);
      } else if (fromDate) {
        timereports = await timereportApi.getTimereportsFromDate(fromDate);
      } else if (toDate) {
        timereports = await timereportApi.getTimereportsToDate(toDate);
      } else {
        timereports = await timereportApi.getAllTimereports();
      }
      // Filter timereports based on workplace_id
      timereports = timereports.filter(report => report.workplace_id === parseInt(workplaceId));
      // Handle the response and update the UI accordingly
      timereportApiService.createTimereportTableRows(timereports);
      timereportApiService.createTimereportDetailsModal(timereports);
    } else {
      // Use Timereporting API for fetching data from local MySql database
      if (workplaceId && fromDate && toDate) {
        timereports = await timereportingApi.getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate);
      } else if (workplaceId && fromDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndFromDate(workplaceId, fromDate);
      } else if (workplaceId && toDate) {
        timereports = await timereportingApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate);
      } else if (workplaceId) {
        timereports = await timereportingApi.getTimereportsByWorkplaceId(workplaceId);
      } else if (fromDate && toDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate);
      } else if (fromDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
      } else if (toDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndToDate(toDate);
      } else {
        timereports = await timereportingApi.fetchTimereportsByAllWorkplacesForEntirePeriod();
      }
    }
  } catch (error) {
    // Handle the error
    console.log(error);
  }
}

const button = document.getElementById('get-timereports');
button.addEventListener('click', fetchTimereports);
})();

/******/ })()
;
//# sourceMappingURL=previewTimeReportModule.js.map