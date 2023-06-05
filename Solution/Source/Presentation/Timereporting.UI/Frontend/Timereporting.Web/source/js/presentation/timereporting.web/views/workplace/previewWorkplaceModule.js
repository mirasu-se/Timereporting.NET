import appConfig from '../../../../application/appConfig';

import SelectedApiEndpointHandler from '../../../timereporting.api/handlers/selectedApiEndpointHandler';
import TrinaxWorkplaceDataPresenter from '../../../timereporting.api/presenters/trinaxWorkplaceDataPresenter';
import FallbackWorkplaceDataPresenter from '../../../timereporting.api/presenters/fallbackWorkplaceDataPresenter';

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

async function getWorkplaces() {
  console.log(`We are fetching from ${getApiEndpoint()}`);
  try {
    let workplaces;

    if (getApiEndpoint() === appConfig.getApiBaseUrl()) {
      const trinaxDataPresenter = new TrinaxWorkplaceDataPresenter();
        // Use Trinax API for fetching data from Trinax database
        workplaces = await selectedApiEndpointHandler.handleWorkplaceApiRequests();
        // Filter timereports based on workplace.id
        workplaces = workplaces.filter(workplace => workplace.id === parseInt(workplace.id));
        // Handle the response and update the UI accordingly
        trinaxDataPresenter.presentTableRows(workplaces);
        trinaxDataPresenter.presentDetailsModal(workplaces);
    } else {
        const fallbackDataPresenter = new FallbackWorkplaceDataPresenter();
        // Use Timereporting API for fetching data from local MySql database
        workplaces = await selectedApiEndpointHandler.handleWorkplaceApiRequests();
        // Handle the response and update the UI accordingly
        fallbackDataPresenter.presentTableRows(workplaces);
        fallbackDataPresenter.presentDetailsModal(workplaces);
    }
  } catch (error) {
    // Handle the error
    console.log(error);
  }
}

const button = document.getElementById('get-workplaces');
button.addEventListener('click', getWorkplaces);