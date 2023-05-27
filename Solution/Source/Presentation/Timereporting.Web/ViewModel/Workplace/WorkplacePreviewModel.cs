using Timereporting.Interaction.DataTransfer.Models.Objects;
using Timereporting.Web.ViewModel.Timereport;

namespace Timereporting.Web.ViewModel.Workplace
{
    public class WorkplacePreviewModel
    {
        public IEnumerable<WorkplaceDataModel>? Workplaces { get; set; }

        public WorkplaceDetailsModel WorkplaceDetails { get; set; }
    }
}
