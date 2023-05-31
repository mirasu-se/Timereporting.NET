class TimereportingApiClient {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async sendRequest(method, path, data = null) {
    const url = `${this.apiBaseUrl}${path}`;
    const headers = {};

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

  async put(path, data) {
    return this.sendRequest('PUT', path, data);
  }

  async delete(path) {
    return this.sendRequest('DELETE', path);
  }
}

export default TimereportingApiClient;