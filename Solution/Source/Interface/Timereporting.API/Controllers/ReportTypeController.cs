using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/reporttype")]
    [ApiController]
    [Authorize]
    public class ReportTypeController : ControllerBase
    {
        private readonly IReportTypeService _reportTypeService;

        public ReportTypeController(IReportTypeService reportTypeService)
        {
            _reportTypeService = reportTypeService;
        }

        // GET: api/v1/reporttype
        [HttpGet]
        public IActionResult GetReportTypes()
        {
            var reportTypes = _reportTypeService.GetAllReportTypes();
            return Ok(reportTypes);
        }

        // GET: api/v1/reporttype/{id}
        [HttpGet("{id}")]
        public IActionResult GetReportType(int id)
        {
            var reportType = _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }
            return Ok(reportType);
        }

        // POST: api/v1/reporttype
        [HttpPost]
        public IActionResult CreateReportType([FromBody] ReportType reportType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdReportTypeId = _reportTypeService.CreateReportType(reportType);

            return CreatedAtAction(nameof(GetReportType), new { id = createdReportTypeId }, reportType);
        }

        // PUT: api/v1/reporttype/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateReportType(int id, [FromBody] ReportType updatedReportType)
        {
            var reportType = _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }

            _reportTypeService.UpdateReportType(reportType, updatedReportType);

            return NoContent();
        }

        // DELETE: api/v1/reporttype/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteReportType(int id)
        {
            var reportType = _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }

            _reportTypeService.DeleteReportType(reportType);

            return NoContent();
        }
    }
}