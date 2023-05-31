import TimereportingApiService from "../timereport/timereportingApiService";

const timereportingApiService = new TimereportingApiService();

class TimereportingApi {
    constructor(apiClient) {
      this.apiClient = apiClient;
    }
  
    async getTimereportsByAllWorkplaces() {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceId(workplaceId) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportByTimereportId(reportId) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport/${reportId}`);
        const data = await response.json();
        // Update the modal with the fetched report data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
        // Show the modal
        $(`#reportDetails_${reportId}`).modal('show');
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    }
  
    async getTimereportsByWorkplaceIdAndFromDate(workplaceId, fromDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&to_date=${toDate}`);
        const data = await response.json();
        // Process the fetched data
        timereportingApiService.createTimereportTableRows(data);
        timereportingApiService.createTimereportDetailsModal(data);
      } catch (error) {
        console.error("Error fetching timereports:", error);
      }
    }
  
    async getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/timereport?workplace=${workplaceId}&from_date=${fromDate}&to_date=${toDate}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching timereports:", error);
        return null;
      }
    }
  
    async getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}&to_date=${toDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    
      async getTimereportsByAllWorkplacesAndFromDate(fromDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?from_date=${fromDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    
      async getTimereportsByAllWorkplacesAndToDate(toDate) {
        try {
          const response = await fetch(`http://localhost:5000/api/v1/timereport?to_date=${toDate}`);
          const data = await response.json();
          // Process the fetched data
          timereportingApiService.createTimereportTableRows(data);
          timereportingApiService.createTimereportDetailsModal(data);
        } catch (error) {
          console.error("Error fetching timereports:", error);
        }
      }
    }
    
export default TimereportingApi;
    
  