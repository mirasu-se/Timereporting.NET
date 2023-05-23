using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/timereport")]
    [ApiController]
    [Authorize]
    public class TimereportController : ControllerBase
    {
        private readonly ITimereportService _timereportService;

        public TimereportController(ITimereportService timereportService)
        {
            _timereportService = timereportService;
        }

        // GET: api/v1/timereports
        [HttpGet]
        public IActionResult GetTimereports()
        {
            var timereports = _timereportService.GetAllTimereportsAsync().Result;
            return Ok(timereports);
        }

        // GET: api/v1/timereports/{id}
        [HttpGet("{id}")]
        public IActionResult GetTimereport(int id)
        {
            var timereport = _timereportService.GetTimereportByIdAsync(id).Result;
            if (timereport == null)
            {
                return NotFound();
            }
            return Ok(timereport);
        }

        // POST: api/v1/timereports
        [HttpPost]
        public IActionResult CreateTimereport([FromBody] Timereport timereport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTimereportId = _timereportService.CreateTimereportAsync(timereport).Result;

            return CreatedAtAction(nameof(GetTimereport), new { id = createdTimereportId }, timereport);
        }

        // PUT: api/v1/timereports/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTimereport(int id, [FromBody] Timereport updatedTimereport)
        {
            var timereport = _timereportService.GetTimereportByIdAsync(id).Result;
            if (timereport == null)
            {
                return NotFound();
            }

            // Update the properties of the timereport entity based on the updatedTimereport
            timereport.LastTimeUpdated = DateTime.UtcNow;
            timereport.UserUpdated = updatedTimereport.UserUpdated;

            _timereportService.UpdateTimereportAsync(timereport).Wait();

            return NoContent();
        }

        // DELETE: api/v1/timereports/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTimereport(int id)
        {
            var timereport = _timereportService.GetTimereportByIdAsync(id).Result;
            if (timereport == null)
            {
                return NotFound();
            }

            _timereportService.DeleteTimereportAsync(timereport).Wait();

            return NoContent();
        }
    }
}