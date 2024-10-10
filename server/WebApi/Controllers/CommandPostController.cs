using ffmpeg_conversion_helper.Domain.Models;
using ffmpeg_conversion_helper.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using ffmpeg_commander.Application.DTO;

namespace ffmpeg_conversion_helper.WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CommandPostController : ControllerBase
    {
        private readonly ICommandPostRepository _repository;

        public CommandPostController(ICommandPostRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<CommandPost>> CreateCommandPost([FromBody] CommandPostDtoCreate commandPostDtoCreate)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not found or unauthorized.");
            }

            var createdPost = await _repository.CreateAsync(commandPostDtoCreate, userId);

            return CreatedAtAction(nameof(GetCommandPost), new { id = createdPost.Id }, createdPost);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CommandPost>> GetCommandPost(Guid id)
        {
            var commandPost = await _repository.GetByIdAsync(id);
            if (commandPost == null)
            {
                return NotFound();
            }

            return Ok(commandPost);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCommandPost(Guid id, [FromBody] CommandPost commandPost)
        {
            if (id != commandPost.Id)
            {
                return BadRequest();
            }

            await _repository.UpdateAsync(commandPost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommandPost(Guid id)
        {
            var success = await _repository.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}