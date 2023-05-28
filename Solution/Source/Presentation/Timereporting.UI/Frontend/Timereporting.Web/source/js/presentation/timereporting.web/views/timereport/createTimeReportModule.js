import imageProcessing from "../../../../infrastructure/filesystem/imageProcessing";

// Function to open the image file dialog
function openImageFileDialog() {
  imageProcessing.openImageFileDialog();
} window.openImageFileDialog = openImageFileDialog;
  
// Function to preview the image
function previewImage(event) {
    imageProcessing.previewImage(event);
} window.previewImage = previewImage;
  
  // Function to show the failure modal
function showModal(modalId, delay) {
    $('#' + modalId).fadeIn();
    setTimeout(function() {$('#' + modalId).modal('hide');}, delay);
} window.showModal = showModal;
  
function submitTimereportForm(event) {
  event.preventDefault();
  var form = $('#create-timereport-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    var formData = new FormData();
    formData.append('workplaceId', $('#workplaceId').val());
    formData.append('name', $('#workplaceId').text());
    formData.append('date', $('#date').val());
    formData.append('hours', $('#hours').val());
    formData.append('imageFile', $('#image')[0].files[0]);
    formData.append('info', $('#info').val());
    
    $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      url: 'http://localhost:5000/api/v1/timereport',
      data: formData,
      success: function () {
        $('#workplaceId').val('0');
        $('#date').val('');
        $('#hours').val('');
        $('#image').val('');
        $('#info').val('');
        $('.success').html('Tidsrapporten har skickats framgångsrikt!');
        setTimeout(function () {
          window.location.reload();
        }, 3500);
      },
      error: function () {
        $('.error').html('Något gick fel. Vänligen försök igen senare.');
      }
    });
  }
} window.submitTimereportForm = submitTimereportForm;