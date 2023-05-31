class AppModalPresenter {
    showFailureModal(delay) {
      $('#submission-failed-modal').fadeIn();
      setTimeout(function() {
        $('#submission-failed-modal').modal('hide');
      }, delay);
    }
  
    showSuccessModal(modalId, delay) {
      $('#submission-successful-modal').fadeIn();
      setTimeout(function() {
        $('#submission-successful-modal').modal('hide');
      }, delay);
    }
  }
  
  export default AppModalPresenter;
  