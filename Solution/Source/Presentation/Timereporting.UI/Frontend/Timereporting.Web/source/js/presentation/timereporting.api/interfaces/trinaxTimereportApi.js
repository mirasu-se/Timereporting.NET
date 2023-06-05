class TrinaxTimereportApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getTimereportsByAllWorkplaces() {
    try {
      const path = `/timereport`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching all timereports:", error);
      return null;
    }
  }

  async getTimereportsByAllWorkplacesAndDateRange(fromDate, toDate) {
    if (fromDate > toDate) {
      return null;
    }
  
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
  
  async getTimereportsByAllWorkplacesAndFromDate(fromDate) {
    try {
      const now = new Date().toISOString().split('T')[0];
      const filters = {
        from_date: encodeURIComponent(fromDate),
        to_date: encodeURIComponent(now)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
  
      return response;
    } catch (error) {
      console.error("Error fetching timereports from date:", error);
      return null;
    }
  }
  
  async getTimereportsByAllWorkplacesAndToDate(toDate) {
    try {
      const startOfTime = new Date(0).toISOString().slice(0, 10);
      const filters = {
        from_date: encodeURIComponent(startOfTime),
        to_date: encodeURIComponent(toDate)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
  
      return response;
    } catch (error) {
      console.error("Error fetching timereports to date:", error);
      return null;
    }
  }
  

  async getTimereportByWorkplaceId(workplaceId) {
    try {
      const path = `/timereport/${encodeURIComponent(parseInt(workplaceId))}`;
      const response = await this.apiClient.get(path);
      return response;
    } catch (error) {
      console.error("Error fetching timereport:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceId(workplaceId) {
    try {
      const path = '/timereport';
      const timereports = await this.apiClient.get(path);

      if (parseInt(workplaceId) === 0) {
        return timereports;
      }
      else {
        return timereports.filter(report => report.workplace_id === parseInt(workplaceId));
      }
    } catch (error) {
      console.error("Error fetching timereports by workplace ID:", error);
      return null;
    }
  }

  async getTimereportsByWorkplaceIdAndDateRange(workplaceId, fromDate, toDate) {
    if (fromDate > toDate) {
      return null;
    }
  
    try {
      const filters = {
        from_date: encodeURIComponent(fromDate),
        to_date: encodeURIComponent(toDate)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
      
      // Filter the response by workplace_id property
      const filteredResponse = response.filter((timereport) => timereport.workplace_id === parseInt(workplaceId));
      
      return filteredResponse;
    } catch (error) {
      console.error("Error fetching timereports by date range:", error);
      return null;
    }
  }  
  
  async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
    try {
      const now = new Date().toISOString().split('T')[0];
      const filters = {
        from_date: encodeURIComponent(fromDate),
        to_date: encodeURIComponent(now)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
      
      // Filter the response by workplace_id property
      const filteredResponse = response.filter((timereport) => timereport.workplace_id === parseInt(workplaceId));
      
      return filteredResponse;
    } catch (error) {
      console.error("Error fetching timereports from date:", error);
      return null;
    }
  }
  
  async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
    try {
      const startOfTime = new Date(0).toISOString().slice(0, 10);
      const filters = {
        from_date: encodeURIComponent(startOfTime),
        to_date: encodeURIComponent(toDate)
      };
      const queryString = new URLSearchParams(filters).toString();
      const path = `/timereport${queryString ? `?${queryString}` : ''}`;
      const response = await this.apiClient.get(path);
      
      // Filter the response by workplace_id property
      const filteredResponse = response.filter((timereport) => timereport.workplace_id === parseInt(workplaceId));
      
      return filteredResponse;
    } catch (error) {
      console.error("Error fetching timereports to date:", error);
      return null;
    }
  }  
}

export default TrinaxTimereportApi;