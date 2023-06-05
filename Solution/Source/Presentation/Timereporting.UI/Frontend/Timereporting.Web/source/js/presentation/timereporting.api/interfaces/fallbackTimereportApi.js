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

export default FallbackTimereportApi;