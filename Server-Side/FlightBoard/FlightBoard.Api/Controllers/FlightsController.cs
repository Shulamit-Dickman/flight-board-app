using FlightBoard.Application;
using FlightBoard.Application.Commands;
using FlightBoard.Domain.Enum;
using FlightBoard.Domain.ValueObjects;
using FlightBoard.Infrastructure.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FlightBoard.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : Controller
    {
        private readonly IFlightService _flightService;
        private readonly IHubContext<FlightHub> _hubContext;

        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flights = await _flightService.GetAllAsync();
            return Ok(flights);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetAll([FromQuery] FlightStatus? status, [FromQuery] string? destination)
        {
            var flights = await _flightService.GetFilteredAsync(status, destination);
            return Ok(flights);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFlightCommand command)
        {
            if (!await _flightService.IsUniqueFlightNumber(command.FlightNumber))
                return BadRequest(ErrorMessage.FlightNumberExists.ToString());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdFlight = await _flightService.CreateAsync(command);
            return CreatedAtAction(nameof(GetAll), new { id = createdFlight.Id }, createdFlight);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _flightService.DeleteAsync(id);
            return NoContent();
        }
    }
}
