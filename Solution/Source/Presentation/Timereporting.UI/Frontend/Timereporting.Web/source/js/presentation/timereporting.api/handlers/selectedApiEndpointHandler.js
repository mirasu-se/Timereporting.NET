import appConfig from '../../../application/appConfig';

import TrinaxApiClient from '../clients/trinaxApiClient';
import TrinaxApiService from '../services/trinaxApiService';
import TrinaxTimereportDataPresenter from '../presenters/trinaxTimereportDataPresenter';
import TrinaxWorkplaceDataPresenter from '../presenters/trinaxWorkplaceDataPresenter';

import FallbackApiClient from '../clients/fallbackApiClient';
import FallbackApiService from '../services/fallbackApiService';
import FallbackTimereportDataPresenter from '../presenters/fallbackTimereportDataPresenter';
import FallbackWorkplaceDataPresenter from '../presenters/fallbackWorkplaceDataPresenter';

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
    if (this.apiEndpoint === appConfig.getApiBaseUrl()) {
      this.trinaxTimereportDataPresenter = new TrinaxTimereportDataPresenter(this.apiEndpoint);
      this.trinaxWorkplaceDataPresenter = new TrinaxWorkplaceDataPresenter(this.apiEndpoint);
      this.trinaxApiService = new TrinaxApiService(this.apiEndpoint);
      this.createWorkplaceOptionsTrinax();
    } else {
      this.fallbackTimereportDataPresenter = new FallbackTimereportDataPresenter(this.apiEndpoint);
      this.fallbackWorkplaceDataPresenter = new FallbackWorkplaceDataPresenter(this.apiEndpoint);
      this.fallbackApiService = new FallbackApiService(this.apiEndpoint);
      this.createWorkplaceOptionsFallback();
    }
  }

  // Bind the change event handler to the API endpoint selection element
  bindEndpointChangeHandler(endpointElementId) {
    $(`#${endpointElementId}`).on('change', () => {
      this.apiEndpoint = document.getElementById(endpointElementId).value;

      if (this.apiEndpoint === appConfig.getApiBaseUrl()) {
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
    this.trinaxApiClient = new TrinaxApiClient(this.apiEndpoint);
    this.trinaxApiService = new TrinaxApiService(this.apiEndpoint);
  }

  // Initialize Fallback services
  initializeFallbackServices() {
    this.fallbackApiClient = new FallbackApiClient(this.apiEndpoint);
    this.fallbackApiService = new FallbackApiService(this.apiEndpoint);
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
    if (this.apiEndpoint === appConfig.getApiBaseUrl()) {
      return this.trinaxApiService.handleTrinaxApiWorkplaceRequests();
    } else {
      return this.fallbackApiService.handleFallbackApiWorkplaceRequests();
    }
  }

  // Handle API requests based on the selected API endpoint "timereport"
  async handleTimereportApiRequests(fromDate, toDate, workplaceId) {
    if (this.apiEndpoint === appConfig.getApiBaseUrl()) {
      return this.trinaxApiService.handleTrinaxApiTimereportRequests(fromDate, toDate, workplaceId);
    } else {
      return this.fallbackApiService.handleFallbackApiTimereportRequests(fromDate, toDate, workplaceId);
    }
  }
}

export default SelectedApiEndpointHandler;