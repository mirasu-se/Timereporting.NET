import imageProcessing from "../../../infrastructure/filesystem/imageProcessing";

// Function to open the image file dialog
function openImageFileDialog() {
  imageProcessing.openImageFileDialog();
}
  
// Function to preview the image
function previewImage(event) {
    imageProcessing.previewImage(event);
}
  
  // Function to show the failure modal
function showModal(modalId, delay) {
    $('#' + modalId).fadeIn();
    setTimeout(function() {$('#' + modalId).modal('hide');}, delay);
}
  

function submitTimeReport(event) {
  event.preventDefault();
  var form = $('#create-time-report-form');
  form.validate();
  if (!form.valid()) {
    return;
  } else {
    var formData = new FormData(form[0]);
    $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      url: 'http://localhost:5000/api/v1/timereport',
      data: formData,
      success: function () {
        $('#WorkplaceId').val('0');
        $('#Date').val('');
        $('#Hours').val('');
        $('#image').val('');
        $('#Info').val('');
        $('.success').html('Tidsrapporten har skickats in.');
        setTimeout(function () {
          window.location.reload();
        }, 5000);
      },
      error: function () {
        $('.error').html('Något gick fel och vi kunde inte skicka in tidsrapporten. Vänligen försök igen senare.');
      }
    });
  }
}
  
  // Expose functions to the global scope
  window.previewImage = previewImage;
  window.openImageFileDialog = openImageFileDialog;
  window.submitTimeReport = submitTimeReport;
  window.showModal = showModal;