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

function submitWorkplaceForm() {
  $('#create-workplace-form').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    form.validate();
    if (!form.valid()) {
      return;
    } else {
      var formData = new FormData();
      formData.append('name', $('#name').val());
      formData.append('info', $('#info').val());
      formData.append('imageFile', $('#image')[0].files[0]);
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url: 'http://localhost:5000/api/v1/workplace',
        data: formData,
        success: function () {
          $('#name').val('');
          $('#info').val('');
          $('#image').val('');
          $('.success').html('Arbetsplatsen har skickats framgångsrikt!!');
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        },
        error: function () {
          $('.error').html('Något gick fel. Vänligen försök igen senare.');
        }
      });
    }
  });
};

  

// Expose functions to the global scope
window.previewImage = previewImage;
window.openImageFileDialog = openImageFileDialog;
window.submitWorkplaceForm = submitWorkplaceForm;
window.showModal = showModal; 