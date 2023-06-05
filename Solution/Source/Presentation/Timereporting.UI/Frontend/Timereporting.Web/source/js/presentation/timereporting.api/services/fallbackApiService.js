import FallbackApiClient from '../clients/fallbackApiClient';
import FallbackTimereportApi from '../interfaces/fallbackTimereportApi';
import FallbackWorkplaceApi from '../interfaces/fallbackWorkplaceApi';
import FallbackWorkplaceDataPresenter from '../presenters/fallbackWorkplaceDataPresenter';

class FallbackApiService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.fallbackApiClient = new FallbackApiClient(this.apiEndpoint);
    this.fallbackTimereportApi = new FallbackTimereportApi(this.fallbackApiClient);
    this.fallbackWorkplaceApi = new FallbackWorkplaceApi(this.fallbackApiClient);
    this.fallbackWorkplaceDataPresenter = new FallbackWorkplaceDataPresenter();
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

export default FallbackApiService;