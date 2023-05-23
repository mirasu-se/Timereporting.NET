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
  
  
  // Function to submit the time report
  function submitTimeReport(event, apiHost) {
    event.preventDefault();
    console.log("Trying to submit...");

    const form = document.getElementById('create-time-report-form');
  
    // Retrieve form data
    const { date, hours, workplace, other, image } = form.elements;
  
    const formData = new FormData();
  
    // Append form data
    formData.append('date', date.value);
    formData.append('hours', hours.value);
    formData.append('workplace', workplace.value);
    formData.append('other', other.value);
    formData.append('image', image.files[0]);
  
    // Send AJAX request to submit the time report
    $.ajax({
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      url: apiHost + '/api/v1/timereport',
      success: function(data) {
        // Handle successful submission
        console.log('Time report submitted successfully:', data);
        showSuccessModal();
        disposeModalAfterDelay('reportSubmissionSuccessfulModal', 10000);
      },
      error: function(jqXhr, status, error) {
        // Handle error
        console.error('An error occurred while submitting the time report:', error);
        showFailureModal();
        disposeModalAfterDelay('reportSubmissionFailedModal', 10000);
      }
    });
  }
  
  // Expose functions to the global scope
  window.previewImage = previewImage;
  window.openImageFileDialog = openImageFileDialog;
  window.submitTimeReport = submitTimeReport;
  window.showModal = showModal;