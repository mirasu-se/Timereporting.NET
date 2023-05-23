using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Timereporting.Api.Services.Contracts;
using Timereporting.Infrastructure.Data.Entities;

namespace Timereporting.Api.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    [Authorize]
    public class AppUserController : ControllerBase
    {
        private readonly IUserService _userService;

        public AppUserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/v1/user
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }

        // GET: api/v1/user/{id}
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST: api/v1/user
        [HttpPost]
        public IActionResult CreateUser([FromBody] AppUser user)
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
        public IActionResult UpdateUser(int id, [FromBody] AppUser updatedUser)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userService.UpdateUser(user, updatedUser);

            return NoContent();
        }

        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            _userService.DeleteUser(user);

            return NoContent();
        }
    }
}