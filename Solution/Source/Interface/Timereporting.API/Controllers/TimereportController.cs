using Microsoft.AspNetCore.Mvc;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/timereport")]
    [ApiController]
    //[Authorize]
    public class TimereportController : ControllerBase
    {
        private readonly ITimereportService _timereportService;

        public TimereportController(ITimereportService timereportService)
        {
            _timereportService = timereportService;
        }

        // GET: api/v1/timereport
        [HttpGet]
        public async Task<IActionResult> GetTimereports()
        {
            var timereports = await _timereportService.GetAllTimereportsAsync();
            return Ok(timereports);
        }

        // GET: api/v1/timereport/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimereport(Guid id)
        {
            var timereport = await _timereportService.GetTimereportByIdAsync(id);
            if (timereport == null)
            {
                return NotFound();
            }
            return Ok(timereport);
        }

        // POST: api/v1/timereport
        [HttpPost]
        public async Task<IActionResult> CreateTimereport([FromBody] TimereportDto timereport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTimereportId = await _timereportService.CreateTimereportAsync(timereport);

            return CreatedAtAction(nameof(GetTimereport), new { id = createdTimereportId }, timereport);
        }

        // PUT: api/v1/timereport/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTimereport(Guid id, [FromBody] TimereportDto updatedTimereport)
        {
            var timereport = await _timereportService.GetTimereportByIdAsync(id);
            if (timereport == null)
            {
                return NotFound();
            }

            // Update the properties of the timereport entity based on the updatedTimereport
            timereport.LastTimeUpdated = DateTime.UtcNow;
            timereport.UserUpdated = updatedTimereport.UserUpdated;

            await _timereportService.UpdateTimereportAsync(timereport);

            return NoContent();
        }

        // DELETE: api/v1/timereport/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimereport(Guid id)
        {
            var timereport = await _timereportService.GetTimereportByIdAsync(id);
            if (timereport == null)
            {
                return NotFound();
            }

            await _timereportService.DeleteTimereportAsync(timereport);

            return NoContent();
        }
    }
}
