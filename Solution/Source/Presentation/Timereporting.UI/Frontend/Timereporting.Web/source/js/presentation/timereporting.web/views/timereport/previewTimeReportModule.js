import appConfig from '../../../../application/appConfig';
import TrinaxApiClient from '../../../arbetsprov.trinax.api/trinaxApiClient';
import TimereportApi from '../../../arbetsprov.trinax.api/timereport/timereportApi';
import TimereportApiService from '../../../arbetsprov.trinax.api/timereport/timereportApiService';
import TimereportingApiClient from '../../../timereporting.api/timereportingApiClient';
import TimereportingApi from '../../../timereporting.api/timereport/timereportingApi';

let apiEndpoint = document.getElementById('api-endpoint').value;

async function fetchAllWorkplaces() {
  try {
    const workplaceFilter = $('#workplace-filter');
    // Fetch workplaces and fill the combo box
    const response = await fetch(`${apiEndpoint}/workplace`);
    const data = await response.json();

    // Clear existing options
    workplaceFilter.empty();

    // Add the "Get all tidrapporter" option
    const getAllOptionHTML = '<option value="0" class="get-all-option" selected>Få alla tidrapporter</option>';
    workplaceFilter.append(getAllOptionHTML);

    // Add other workplace options
    data.forEach(workplace => {
      const optionHTML = `<option value="${workplace.id}">${workplace.name}</option>`;
      workplaceFilter.append(optionHTML);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

$('#api-endpoint').on('change', function() {
  const selectedIndex = this.selectedIndex;
  const workplaceFilter = $('#workplace-filter');
  
  if (selectedIndex !== 0) {
    apiEndpoint = document.getElementById('api-endpoint').value;
    const timereportingHTMLOptions = '<option value="0" class="get-all-option" selected>Få alla tidrapporter</option>';
    workplaceFilter.prepend(timereportingHTMLOptions);
    fetchAllWorkplaces();
  } else {
    apiEndpoint = document.getElementById('api-endpoint').value;
    window.location.reload();
  }
});

const trinaxApiClient = new TrinaxApiClient(apiEndpoint, appConfig.getApiAuthorizationKey());
const timereportApi = new TimereportApi(trinaxApiClient);
const timereportApiService = new TimereportApiService();

const timereportingApiClient = new TimereportingApiClient(apiEndpoint);
const timereportingApi = new TimereportingApi(timereportingApiClient, apiEndpoint);


async function fetchTimereports() {
  console.log(`We are fetching from ${apiEndpoint}`);
  try {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    const workplaceId = document.getElementById('workplace-filter').value;

    let timereports;

    if (apiEndpoint === "https://arbetsprov.trinax.se/api/v1") {
      // Use Trinax API for fetching data from Trinax database
      if (fromDate && toDate) {
        timereports = await timereportApi.getTimereportsByDateRange(fromDate, toDate);
      } else if (fromDate) {
        timereports = await timereportApi.getTimereportsFromDate(fromDate);
      } else if (toDate) {
        timereports = await timereportApi.getTimereportsToDate(toDate);
      } else {
        timereports = await timereportApi.getAllTimereports();
      }
      // Filter timereports based on workplace_id
      timereports = timereports.filter(report => report.workplace_id === parseInt(workplaceId));
      // Handle the response and update the UI accordingly
      timereportApiService.createTimereportTableRows(timereports);
      timereportApiService.createTimereportDetailsModal(timereports);
    } else {
      // Use Timereporting API for fetching data from local MySql database
      if (workplaceId && fromDate && toDate) {
        timereports = await timereportingApi.getTimereportsByWorkplaceIdBetweenDates(workplaceId, fromDate, toDate);
      } else if (workplaceId && fromDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndFromDate(workplaceId, fromDate);
      } else if (workplaceId && toDate) {
        timereports = await timereportingApi.getTimereportsByWorkplaceIdAndToDate(workplaceId, toDate);
      } else if (workplaceId) {
        timereports = await timereportingApi.getTimereportsByWorkplaceId(workplaceId);
      } else if (fromDate && toDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesBetweenDates(fromDate, toDate);
      } else if (fromDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndFromDate(fromDate);
      } else if (toDate) {
        timereports = await timereportingApi.getTimereportsByAllWorkplacesAndToDate(toDate);
      } else {
        timereports = await timereportingApi.fetchTimereportsByAllWorkplacesForEntirePeriod();
      }
    }
  } catch (error) {
    // Handle the error
    console.log(error);
  }
}

const button = document.getElementById('get-timereports');
button.addEventListener('click', fetchTimereports);