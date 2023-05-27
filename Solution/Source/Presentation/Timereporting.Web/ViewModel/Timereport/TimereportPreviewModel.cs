using Timereporting.Interaction.DataTransfer.Models.Objects;

namespace Timereporting.Web.ViewModel.Timereport
{
    public class TimereportPreviewModel
    {
        public IEnumerable<WorkplaceDataModel>? Workplaces { get; set; }

        public IEnumerable<TimereportDataModel>? Timereports { get; set; }

        public TimereportDetailsModel? ReportDetails { get; set; }
    }
}
