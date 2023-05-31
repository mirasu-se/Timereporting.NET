class TrinaxApiClient {
    constructor(apiBaseUrl, authorizationToken) {
      this.apiBaseUrl = apiBaseUrl;
      this.authorizationToken = authorizationToken;
    }
  
    async sendRequest(method, path, data = null) {
      const url = `${this.apiBaseUrl}${path}`;
      const headers = {
        'Authorization': `bearer ${this.authorizationToken}`,
        'Accept': 'application/json'
      };
  
      if (data) {
        headers['Content-Type'] = 'application/json';
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    }
  
    async get(path) {
      return this.sendRequest('GET', path);
    }
  
    async post(path, data) {
      return this.sendRequest('POST', path, data);
    }
  }

  export default TrinaxApiClient;
