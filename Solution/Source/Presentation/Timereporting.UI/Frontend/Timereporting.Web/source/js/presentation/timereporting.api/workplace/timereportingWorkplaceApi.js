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

export default TimereportingWorkplaceApi;