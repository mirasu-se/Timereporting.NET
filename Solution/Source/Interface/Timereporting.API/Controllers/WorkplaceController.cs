using Microsoft.AspNetCore.Mvc;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO.Workplace;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/workplace")]
    [ApiController]
    //[Authorize]
    public class WorkplaceController : ControllerBase
    {
        private readonly IWorkplaceService _workplaceService;

        public WorkplaceController(IWorkplaceService workplaceService)
        {
            _workplaceService = workplaceService;
        }

        // GET: api/v1/workplace
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkplaceDto>>> GetWorkplaces()
        {
            var workplaces = await _workplaceService.GetAllWorkplacesAsync();
            return Ok(workplaces);
        }

        // GET: api/v1/workplace/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WorkplaceDto>> GetWorkplace(Guid id)
        {
            var workplace = await _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }
            return Ok(workplace);
        }

        // POST: api/v1/workplace
        [HttpPost]
        public async Task<ActionResult<WorkplaceDto>> CreateWorkplace([FromBody] WorkplaceDto workplace)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            workplace.WorkplaceUUID = Guid.NewGuid();
            workplace.TimeCreated = DateTime.UtcNow;

            var createdWorkplaceId = await _workplaceService.CreateWorkplaceAsync(workplace);

            return CreatedAtAction(nameof(GetWorkplace), new { id = createdWorkplaceId }, workplace);
        }

        // PUT: api/v1/workplace/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkplace(Guid id, [FromBody] WorkplaceDto updatedWorkplace)
        {
            var workplace = await _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }

            updatedWorkplace.WorkplaceUUID = id;
            updatedWorkplace.LastTimeUpdated = DateTime.UtcNow;

            _workplaceService.UpdateWorkplaceAsync(updatedWorkplace);

            return NoContent();
        }

        // DELETE: api/v1/workplace/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkplace(Guid id)
        {
            var workplace = await _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }

            await _workplaceService.DeleteWorkplaceAsync(id);

            return NoContent();
        }
    }
}