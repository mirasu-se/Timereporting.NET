import TrinaxApiClient from '../clients/trinaxApiClient';
import TrinaxTimereportApi from '../interfaces/trinaxTimereportApi';
import TrinaxWorkplaceApi from '../interfaces/trinaxWorkplaceApi';

class TrinaxApiRepository {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.trinaxApiClient = new TrinaxApiClient(this.apiEndpoint, appConfig.getApiAuthorizationKey());
    this.trinaxTimereportApi = new TrinaxTimereportApi(this.trinaxApiClient);
    this.trinaxWorkplaceApi = new TrinaxWorkplaceApi(this.trinaxApiClient);
  }

  async getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, toDate) {
    return this.trinaxTimereportApi.getTimereportsFromWorkplaceIdAndDateRange(workplaceId, fromDate, toDate); 
  }

  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    return this.trinaxTimereportApi.getTimereportsFromWorkplaceIdAndFromDate(workplaceId, fromDate); 
  }

  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    return this.trinaxTimereportApi.getTimereportsFromWorkplaceIdAndToDate(workplaceId, toDate); 
  }

  async getTimereportsByWorkplaceId(workplaceId) {
    return this.trinaxTimereportApi.getTimereportsByWorkplaceId(workplaceId);
  }

  async getTimereportsByDateRange(fromDate, toDate) {
    return this.trinaxTimereportApi.getTimereportsByDateRange(fromDate, toDate);
  }

  async getTimereportsFromDate(fromDate) {
    return this.trinaxTimereportApi.getTimereportsFromDate(fromDate);
  }

  async getTimereportsToDate(toDate) {
    return this.trinaxTimereportApi.getTimereportsToDate(toDate);
  }

  async getAllTimereports() {
    return this.trinaxTimereportApi.getAllTimereports();
  }

  async getAllWorkplaces() {
    return this.trinaxWorkplaceApi.getAllWorkplaces();
  }
}

export default TrinaxApiRepository;