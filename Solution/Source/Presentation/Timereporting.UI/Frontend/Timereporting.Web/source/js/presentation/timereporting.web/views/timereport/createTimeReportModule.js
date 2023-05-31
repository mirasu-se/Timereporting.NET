
import appConfig from '../../../../application/appConfig';
import ImageProcessing from "../../../../infrastructure/filesystem/imageProcessing";
import AppModalPresenter from '../shared/appModalPresenter';

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

const imageProcessing = new ImageProcessing();
const appModalPresenter = new AppModalPresenter();

const selectedApiEndpoint = document.getElementById('api-endpoint').value;
const authorizationKey= `${appConfig.getApiAuthorizationKey()}`;

// Function to open the image file dialog
window.openImageFileDialog = imageProcessing.openImageFileDialog;

// Attach click event listener to the image preview
$('#image-preview').on('click', openImageFileDialog);

// Function to preview the image
window.previewImage = imageProcessing.previewImage;

// Attach change event listener to the image input field
$('#image-input').on('change', previewImage);

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
      submitTimereportToEnhancedApi();
    }
  }
}

// Function to submit the timereport
function submitTimereport(url, headers) {
  var formData = new FormData();
  formData.append('workplaceId', $('#workplace-filter').val());
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
      $('.success').html('Tidsrapporten har skickats framgångsrikt!');
      appModalPresenter.showSuccessModal(3000);
      setTimeout(function() {
        window.location.reload();
      }, 3500);
    },
    error: function() {
      // Handle error
      appModalPresenter.showFailureModal(3000);
      $('.error').html('Något gick fel. Vänligen försök igen senare.');
    }
  });
}

// Function to submit timereport to Trinax API
function submitTimereportToTrinaxApi() {
  var url = `${apiEndpoint}/timereport`;
  var headers = {
    'Authorization': `bearer ${authorizationKey}`,
    'Accept': 'application/json'
  };

  submitTimereport(url, headers);
}

// Function to submit timereport as a Enhanced
function submitTimereportToEnhancedApi() {
  var url = `${apiEndpoint}/timereport`;
  var headers = {};

  submitTimereport(url, headers);
}

// Event listener for submit button click
$('#submit-button').on('click', submitTimereportForm);