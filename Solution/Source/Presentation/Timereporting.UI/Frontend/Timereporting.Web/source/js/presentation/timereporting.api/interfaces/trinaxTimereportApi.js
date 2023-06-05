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

export default TrinaxTimereportApi;