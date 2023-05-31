import ImageProcessing from "../../../../infrastructure/filesystem/imageProcessing";
import AppModalPresenter from '../shared/appModalPresenter';

const imageProcessing = new ImageProcessing();
const appModalPresenter = new AppModalPresenter();

// Function to open the image file dialog
window.openImageFileDialog = imageProcessing.openImageFileDialog;

// Attach click event listener to the image preview
$('#image-preview').on('click', openImageFileDialog);

// Function to preview the image
window.previewImage = imageProcessing.previewImage;

// Attach change event listener to the image input field
$('#image-input').on('change', previewImage);

$('#api-endpoint').on('change', function() {
  var selectedIndex = this.selectedIndex;

  if (selectedIndex === 0 || selectedIndex === 2) {
    $('.info-option').removeClass('hidden');
    $('.image-option').removeClass('hidden');
  } else {
    $('.info-option').addClass('hidden');
    $('.image-option').addClass('hidden');
  }
});

function shouldSubmitToTrinaxApi() {
  return $('#api-endpoint')[0].selectedIndex === 0;
}

shouldSubmitToTrinaxApi();

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

// Function to submit the workplace
function submitWorkplace(url, headers) {
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

// Function to submit workplace to Trinax API
function submitWorkplaceToTrinaxApi() {
  var url = 'https://arbetsprov.trinax.se/api/v1/workplace';
  var headers = {
    'Authorization': 'bearer abc123testtoken',
    'Accept': 'application/json'
  };

  submitWorkplace(url, headers);
}

// Function to submit workplace as a fallback
function submitWorkplaceToFallbackApi() {
  var url = 'http://localhost:5000/api/v1/workplace';
  var headers = {};

  submitWorkplace(url, headers);
}

// Event listener for submit button click
$('#submit-button').on('click', submitWorkplaceForm);