import AppLogger from '../../application/logging/appLogger';

class workplaceFetcher {
    constructor(apiEndpoint, authorizationToken) {
      this.apiEndpoint = apiEndpoint;
      this.authorizationToken = authorizationToken;
    }
  
    fetchAllWorkplaces() {
      fetch(`${this.apiEndpoint}/workplace`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.authorizationToken}`,
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        appLogger.lo('fetchAllTimereports:', data); // Log the error using the appLogger
      })
      .catch(error => {
        console.log('Error:', error);
      });
    }
  }
  
  export default workplaceFetcher;
  