import AppLogger from '../../application/logging/appLogger';

class timereportFetcher {
    constructor(apiEndpoint, authorizationToken) {
      this.apiEndpoint = apiEndpoint;
      this.authorizationToken = authorizationToken;
    }
  
    fetchAllTimereports() {
      // Make an API request to fetch all timereports
      fetch(`${this.apiEndpoint}/timereport`, {
        headers: {
          Authorization: `bearer ${this.authorizationToken}`,
          Accept: 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the fetched data
          this.processTimereports(data);
          AppLogger.logError('fetchAllTimereports:', data); // Log the error using the AppLogger
        })
        .catch((error) => {
          console.error('Error fetching timereports:', error);
          AppLogger.logError('Error fetching timereports:', error); // Log the error using the AppLogger
        });
    }
  
    processTimereports(data) {
      // Implement your logic to process the fetched timereports data
      console.log(data);
    }
  }
  
  export default timereportFetcher;
  