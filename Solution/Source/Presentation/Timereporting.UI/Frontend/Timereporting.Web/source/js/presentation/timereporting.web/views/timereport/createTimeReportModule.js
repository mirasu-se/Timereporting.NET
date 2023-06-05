
import appConfig from '../../../../application/appConfig';
import SelectedApiEndpointHandler from '../../../timereporting.api/handlers/selectedApiEndpointHandler';
import ImageProcessing from '../../../../infrastructure/filesystem/imageProcessing';
import AppModalPresenter from '../shared/appModalPresenter';

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

const imageProcessing = new ImageProcessing();
const appModalPresenter = new AppModalPresenter();

// Attach click event listener to the image preview
$('#image-preview').on('click', imageProcessing.openImageFileDialog);

// Attach change event listener to the image input field
$('#image-input').on('change', imageProcessing.previewImage);

$('#api-endpoint').on('change', function() {
  var selectedIndex = this.selectedIndex;

  if (selectedIndex === 1) {
    $('.image-option').removeClass('hidden');
  } else {
    $('.image-option').addClass('hidden');
  }
});

// Function to determine whether to submit to Trinax API
function shouldSubmitToTrinaxApi() {
  return $('#api-endpoint')[0].selectedIndex === 0;
}

// Function to handle form submission
function submitTimereportForm(event) {
  event.preventDefault();
  var form = $('#create-timereport-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    // Call the appropriate submitTimereport function based on the condition
    if (shouldSubmitToTrinaxApi()) {
      submitTimereportToTrinaxApi();
    } else {
      submitTimereportToFallbackApi();
    }
  }
}

// Function to submit timereport to Trinax API
function submitTimereportToTrinaxApi() {
  var url = 'https://arbetsprov.trinax.se/api/v1/timereport';
  var headers = {
    'Authorization': `bearer ${appConfig.getApiAuthorizationKey()}`,
    'Accept': 'application/json'
  };

  var formData = new FormData();
  formData.append('workplace_id', $('#workplace-filter').val());
  formData.append('date', $('#date').val());
  formData.append('hours', $('#hours').val());
  formData.append('info', $('#info').val());

  $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    url: url,
    headers: headers,
    data: formData,
    success: function(response) {
      submitTimereportToFallbackApi(response.id);
      // Handle success
      $('#workplace-filter').val('');
      $('#date').val('');
      $('#hours').val('');
      $('#info').val('');
      appModalPresenter.showSuccessModal(5000);
      setTimeout(function() {
        window.location.replace('/Timereport/PreviewTimereport');
      }, 5000);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(5000);
      setTimeout(function() {
        window.location.reload();
      }, 5000);
    }
  });
}



// Function to submit timereport as a Fallback
function submitTimereportToFallbackApi(timereportId) {
  var url = `http://localhost:5000/api/v1/timereport`;
  var headers = {};

  var formData = new FormData();
  formData.append('id', timereportId);
  formData.append('date', $('#date').val());
  formData.append('hours', $('#hours').val());
  formData.append('info', $('#info').val());
  formData.append('imageFile', $('#image-input')[0].files[0]);

  $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    url: url,
    headers: headers,
    data: formData,
    success: function() {
      // Handle success
      $('#workplace-filter').val('0');
      $('#date').val('');
      $('#hours').val('');
      $('#info').val('');
      $('#image-input').val('');
      appModalPresenter.showSuccessModal(5000);
      setTimeout(function() {
        window.location.replace('/Timereport/PreviewTimereport');
      }, 5000);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(5000);
      setTimeout(function() {
        window.location.reload();
      }, 5000);
    }
}


// Event listener for submit button click
$('#submit-button').on('click', submitTimereportForm);