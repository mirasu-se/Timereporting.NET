import appConfig from '../../../../application/appConfig';

import SelectedApiEndpointHandler from '../../../timereporting.api/handlers/selectedApiEndpointHandler';
import TrinaxTimereportDataPresenter from '../../../timereporting.api/presenters/trinaxTimereportDataPresenter';
import FallbackTimereportDataPresenter from '../../../timereporting.api/presenters/fallbackTimereportDataPresenter';

const endpointElementId = 'api-endpoint';

function getApiEndpoint() {
  return document.getElementById(endpointElementId).value;
}

$(`#${endpointElementId}`).on('change', async function() {
  const newApiEndpoint = getApiEndpoint();
  selectedApiEndpointHandler.updateEndpoint(newApiEndpoint);
});

const workplaceFilterElementId = 'workplace-filter';
const selectedApiEndpointHandler = new SelectedApiEndpointHandler(getApiEndpoint(), endpointElementId, workplaceFilterElementId);

async function getTimereports() {
  console.log(`We are fetching from ${getApiEndpoint()}`);
  try {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;
    const workplaceId = document.getElementById('workplace-filter').value;

    let timereports;

    if (getApiEndpoint() === appConfig.getApiBaseUrl()) {
      const trinaxDataPresenter = new TrinaxTimereportDataPresenter();
      timereports = await selectedApiEndpointHandler.handleTimereportApiRequests(fromDate, toDate, workplaceId);
      trinaxDataPresenter.presentTableRows(timereports);
      trinaxDataPresenter.presentDetailsModal(timereports);
    } else {
      const fallbackDataPresenter = new FallbackTimereportDataPresenter();
      timereports = await selectedApiEndpointHandler.handleTimereportApiRequests(fromDate, toDate, workplaceId);
      fallbackDataPresenter.presentTableRows(timereports);
      fallbackDataPresenter.presentDetailsModal(timereports);
    }
  } catch (error) {
    console.log(error);
  }
}

const button = document.getElementById('get-timereports');
button.addEventListener('click', getTimereports);