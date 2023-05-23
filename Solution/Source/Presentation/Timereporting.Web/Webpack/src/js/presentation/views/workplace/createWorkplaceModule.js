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
  
function submitWorkplaceForm(event, apiHost) {
    event.preventDefault();
    console.log("Trying to submit...");

    const form = document.getElementById('create-workplace-form');
  
    // Extract the form data
    const name = form.elements.name.value;
    const address = form.elements.address.value;
    const info = form.elements.info.value;
    const image = form.elements.image.files[0];
  
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('address', address);
    formData.append('info', info);
    formData.append('image', image);
  
    // Perform an AJAX request to submit the form data
    $.ajax({
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        url: apiHost + '/api/v1/workplace',
        success: function(data) {
            // Handle successful submission
            console.log('Workplace form submitted successfully:', data);
            showModal('submissionSuccessfulModal', 10000);
        },
        error: function(jqXhr, status, error) {
            // Handle error
            console.error('An error occurred while submitting the workplace form:', error);
            showModal('submissionFailedModal', 10000);
        }
    });
}

// Expose functions to the global scope
window.previewImage = previewImage;
window.openImageFileDialog = openImageFileDialog;
window.submitWorkplaceForm = submitWorkplaceForm;
window.showModal = showModal; 