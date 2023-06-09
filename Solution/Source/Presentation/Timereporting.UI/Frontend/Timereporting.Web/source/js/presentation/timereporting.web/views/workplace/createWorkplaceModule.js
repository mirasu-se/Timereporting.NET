﻿import appConfig from '../../../../application/appConfig';
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

$(`#${endpointElementId}`).on('change', async function() {
  if (getApiEndpoint() === appConfig.getApiBaseUrl()) {
    $('.info-option').addClass('hidden');
    $('.image-option').addClass('hidden');
  } else {
    $('.info-option').removeClass('hidden');
    $('.image-option').removeClass('hidden');
  }
});

$('#image-preview').on('click', imageProcessing.openImageFileDialog);
$('#image-input').on('change', imageProcessing.previewImage);

function shouldSubmitToTrinaxApi() {
  return $('#api-endpoint')[0].selectedIndex === 0;
}

// Function to handle form submission
function submitWorkplaceForm(event) {
  event.preventDefault();
  var form = $('#create-workplace-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    // Call the appropriate submitWorkplace function based on the condition
    if (shouldSubmitToTrinaxApi()) {
      submitWorkplaceToTrinaxApi();
    } else {
      submitWorkplaceToFallbackApi();
    }
  }
}

// Function to submit workplace to Trinax API
function submitWorkplaceToTrinaxApi() {
  var url = 'https://arbetsprov.trinax.se/api/v1/workplace';
  var headers = {
    'Authorization': `bearer ${appConfig.getApiAuthorizationKey()}`,
    'Accept': 'application/json'
  };

  var formData = new FormData();
  formData.append('name', $('#name').val());
  formData.append('created_time', $('#info').val());

  $.ajax({
    type: 'POST',
    contentType: false,
    processData: false,
    url: url,
    headers: headers,
    data: formData,
    success: function() {
      // Handle success
      $('#name').val('');
      appModalPresenter.showSuccessModal(5000);
      setTimeout(function() {
        window.location.replace('/Workplace/PreviewWorkplace');
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


// Function to submit workplace as a fallback
function submitWorkplaceToFallbackApi() {
  var url = 'http://localhost:5000/api/v1/workplace';
  var headers = {};

  var formData = new FormData();
  formData.append('name', $('#name').val());
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
      $('#name').val('');
      $('#info').val('');
      $('#image-input').val('');
      $('.success').html('Arbetsplatsen har skickats framgångsrikt!');
      appModalPresenter.showSuccessModal(5000);
      setTimeout(function() {
        window.location.replace('/Workplace/PreviewWorkplace');
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

// Event listener for submit button click
$('#submit-button').on('click', submitWorkplaceForm);