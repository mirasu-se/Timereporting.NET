class AppModalPresenter {
  showFailureModal(delay) {
    $('#submission-failed-modal').modal('show');
    setTimeout(function() {
      $('#submission-failed-modal').modal('hide');
    }, delay);
  }

  showSuccessModal(delay) {
    $('#submission-successful-modal').modal('show');
    setTimeout(function() {
      $('#submission-successful-modal').modal('hide');
    }, delay);
  }
}

export default AppModalPresenter;

  