import FallbackApiClient from "../clients/fallbackApiClient";
import FallbackTimereportApi from "../interfaces/fallbackTimereportApi";
import FallbackWorkplaceApi from "../interfaces/fallbackWorkplaceApi";


class FallbackApiRepository {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.fallbackApiClient = new FallbackApiClient(this.apiEndpoint);
    this.fallbackTimereportApi = new FallbackTimereportApi(this.fallbackApiClient);
    this.fallbackWorkplaceApi = new FallbackWorkplaceApi(this.fallbackApiClient);
  }

  async getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate) {
    return this.fallbackTimereportApi.getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate);
  }

  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    return this.fallbackTimereportApi.getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate);
  }

  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    return this.fallbackTimereportApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate);
  }

  async getTimereportsByWorkplaceId(workplaceId) {
    return this.fallbackTimereportApi.getTimereportsByWorkplaceId(workplaceId);
  }

  async getTimereportsByDateRange(fromDate, toDate) {
    return this.fallbackTimereportApi.getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate);
  }

  async getTimereportsFromDate(fromDate) {
    return this.fallbackTimereportApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
  }

  async getTimereportsToDate(toDate) {
    return this.fallbackTimereportApi.getTimereportsByAllWorkplacesAndToDate(toDate);
  }

  async getAllTimereports() {
    return this.fallbackTimereportApi.getTimereportsByAllWorkplaces();
  }

  async getAllWorkplaces() {
    return this.fallbackWorkplaceApi.getAllWorkplaces();
  }
}

export default FallbackApiRepository;