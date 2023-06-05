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
    return this.trinaxTimereportApi.getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, toDate); 
  }

  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    return this.trinaxTimereportApi.getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate); 
  }

  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    return this.trinaxTimereportApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate); 
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

  async getTimereportsByAllWorkplacesAndDateRange(fromDate, toDate) {
    return this.trinaxTimereportApi.getTimereportsByAllWorkplacesAndDateRange(fromDate, toDate);
  }

  async getTimereportsByAllWorkplacesAndFromDate(fromDate) {
    return this.trinaxTimereportApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
  }

  async getTimereportsByAllWorkplacesAndToDate(toDate) {
    return this.trinaxTimereportApi.getTimereportsByAllWorkplacesAndToDate(toDate);
  }

  async getTimereportsByAllWorkplaces() {
    return this.trinaxWorkplaceApi.getTimereportsByAllWorkplaces();
  }
}

export default TrinaxApiRepository;