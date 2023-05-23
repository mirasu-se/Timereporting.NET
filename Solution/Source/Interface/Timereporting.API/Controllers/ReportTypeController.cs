using Microsoft.AspNetCore.Mvc;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO.Timereport;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/reporttype")]
    [ApiController]
    //[Authorize]
    public class ReportTypeController : ControllerBase
    {
        private readonly IReportTypeService _reportTypeService;

        public ReportTypeController(IReportTypeService reportTypeService)
        {
            _reportTypeService = reportTypeService;
        }

        // GET: api/v1/reporttype
        [HttpGet]
        public async Task<IActionResult> GetReportTypes()
        {
            var reportTypes = await _reportTypeService.GetAllReportTypes();
            return Ok(reportTypes);
        }

        // GET: api/v1/reporttype/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReportType(int id)
        {
            var reportType = await _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }
            return Ok(reportType);
        }

        // POST: api/v1/reporttype
        [HttpPost]
        public IActionResult CreateReportType([FromBody] ReportTypeDto reportType)
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
        public async Task<IActionResult> UpdateReportType(int id, [FromBody] ReportTypeDto updatedReportType)
        {
            var reportType = await _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }

            _reportTypeService.UpdateReportType(reportType, updatedReportType);

            return NoContent();
        }

        // DELETE: api/v1/reporttype/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReportType(int id)
        {
            var reportType = await _reportTypeService.GetReportTypeById(id);
            if (reportType == null)
            {
                return NotFound();
            }

            _reportTypeService.DeleteReportType(reportType);

            return NoContent();
        }
    }
}