using Microsoft.AspNetCore.Mvc;
using Timereporting.Application.Services.Contracts;
using Timereporting.Interaction.DTO;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    //[Authorize]
    public class AppUserController : ControllerBase
    {
        private readonly IAppUserService _userService;

        public AppUserController(IAppUserService userService)
        {
            _userService = userService;
        }

        // GET: api/v1/user
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        // GET: api/v1/user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/v1/user
        [HttpPost]
        public IActionResult CreateUser([FromBody] AppUserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user.UserUUID = Guid.NewGuid();
            var createdUserId = _userService.CreateUser(user);

            return CreatedAtAction(nameof(GetUser), new { id = createdUserId }, user);
        }

        // PUT: api/v1/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] AppUserDto updatedUser)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userService.UpdateUser(user, updatedUser);

            return NoContent();
        }

        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userService.DeleteUser(user);

            return NoContent();
        }
    }
}