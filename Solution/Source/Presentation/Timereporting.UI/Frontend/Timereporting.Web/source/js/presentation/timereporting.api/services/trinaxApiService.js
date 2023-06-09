import appConfig from '../../../application/appConfig';
import TrinaxApiClient from '../clients/trinaxApiClient';
import TrinaxTimereportApi from '../interfaces/trinaxTimereportApi';
import TrinaxWorkplaceApi from '../interfaces/trinaxWorkplaceApi';
import TrinaxWorkplaceDataPresenter from '../presenters/trinaxWorkplaceDataPresenter';

class TrinaxApiService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.trinaxApiClient = new TrinaxApiClient(this.apiEndpoint, appConfig.getApiAuthorizationKey());
    this.trinaxTimereportApi = new TrinaxTimereportApi(this.trinaxApiClient);
    this.trinaxWorkplaceApi = new TrinaxWorkplaceApi(this.trinaxApiClient);
    this.trinaxWorkplaceDataPresenter = new TrinaxWorkplaceDataPresenter();
  }

  async getAllWorkplacesTrinax() {
    return this.trinaxWorkplaceApi.getAllWorkplaces();
  }

  createSelectOptionsTrinax(workplaces, filterElement) {
    this.trinaxWorkplaceDataPresenter.presentSelectOptions(workplaces, filterElement);
  }

  async handleTrinaxApiWorkplaceRequests() {
    return this.trinaxWorkplaceApi.getAllWorkplaces();
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
        return trinaxTimereportApi.getTimereportsByAllWorkplacesAndDateRange(fromDate, toDate);
      } else if (fromDate) {
        return trinaxTimereportApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
      } else if (toDate) {
        return trinaxTimereportApi.getTimereportsByAllWorkplacesAndToDate(toDate);
      } else {
        return trinaxTimereportApi.getTimereportsByAllWorkplaces();
      }
    }
  }
}

export default TrinaxApiService;