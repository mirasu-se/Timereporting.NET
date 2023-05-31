class TimereportApi {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getAllTimereports() {
    const path = `/timereport`;
    return this.apiClient.get(path);
  }

  async getTimereportsByDateRange(fromDate, toDate) {
    const filters = {
      from_date: encodeURIComponent(fromDate),
      to_date: encodeURIComponent(toDate)
    };
    const queryString = new URLSearchParams(filters).toString();
    const path = `/timereport${queryString ? `?${queryString}` : ''}`;
    return this.apiClient.get(path);
  }

  async getTimereportsFromDate(fromDate) {
    const now = new Date().toISOString().split('T')[0];
    return this.getTimereportsByDateRange(fromDate, now);
  }

  async getTimereportsToDate(toDate) {
    const startOfTime = new Date(0).toISOString().slice(0, 10);
    return this.getTimereportsByDateRange(startOfTime, toDate);
  }

  async getAllTimereportsWithDateFilter(fromDate, toDate) {
    if (fromDate && toDate) {
      return this.getTimereportsByDateRange(fromDate, toDate);
    } else if (fromDate) {
      return this.getTimereportsFromDate(fromDate);
    } else if (toDate) {
      return this.getTimereportsToDate(toDate);
    } else {
      return this.getAllTimereports();
    }
  }

  async getTimereport(id) {
    const path = `/timereport/${encodeURIComponent(id)}`;
    return this.apiClient.get(path);
  }

  async createTimereport(data) {
    const path = '/timereport';
    return this.apiClient.post(path, data);
  }
}

export default TimereportApi;