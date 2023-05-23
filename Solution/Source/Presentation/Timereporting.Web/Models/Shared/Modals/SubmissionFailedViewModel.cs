namespace Timereporting.Web.Models.Shared.Modals
{
    public class SubmissionFailedViewModel
    {
        public string ModalId { get; set; } = "#submissionFailedModal";
        public string ModalTitle { get; set; }
        public string ModalImageSource { get; set; }
        public string FailureTitle { get; set; }
        public string FailureMessage { get; set; }
    }
}
