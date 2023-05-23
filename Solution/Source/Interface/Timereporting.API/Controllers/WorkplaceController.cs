using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/workplace")]
    [ApiController]
    [Authorize]
    public class WorkplaceController : ControllerBase
    {
        private readonly IWorkplaceService _workplaceService;

        public WorkplaceController(IWorkplaceService workplaceService)
        {
            _workplaceService = workplaceService;
        }

        // GET: api/v1/workplaces
        [HttpGet]
        public ActionResult<IEnumerable<Workplace>> GetWorkplaces()
        {
            var workplaces = _workplaceService.GetAllWorkplacesAsync();
            return Ok(workplaces);
        }

        // GET: api/v1/workplaces/{id}
        [HttpGet("{id}")]
        public ActionResult<Workplace> GetWorkplace(int id)
        {
            var workplace = _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }
            return Ok(workplace);
        }

        // POST: api/v1/workplaces
        [HttpPost]
        public ActionResult<Workplace> CreateWorkplace([FromBody] Workplace workplace)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdWorkplaceId = _workplaceService.CreateWorkplaceAsync(workplace);

            return CreatedAtAction(nameof(GetWorkplace), new { id = createdWorkplaceId }, workplace);
        }

        // PUT: api/v1/workplaces/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateWorkplace(int id, [FromBody] Workplace updatedWorkplace)
        {
            var workplace = _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }

            _workplaceService.UpdateWorkplaceAsync(updatedWorkplace);

            return NoContent();
        }

        // DELETE: api/v1/workplaces/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteWorkplace(int id)
        {
            var workplace = _workplaceService.GetWorkplaceByIdAsync(id);
            if (workplace == null)
            {
                return NotFound();
            }

            _workplaceService.DeleteWorkplaceAsync(id);

            return NoContent();
        }
    }
}
