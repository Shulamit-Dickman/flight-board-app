using FlightBoard.Application.Commands;
using FlightBoard.Domain.Entities;
using FlightBoard.Domain.Enum;
using FlightBoard.Domain.ValueObjects;
using FlightBoard.Infrastructure.Data;
using FlightBoard.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightBoard.Application
{
    public class FlightService : IFlightService
    {
        private readonly FlightDbContext _context;
        private readonly IHubContext<FlightHub> _hubContext;
        private readonly ILogger<FlightService> _logger;
        public FlightService(FlightDbContext context,
                            IHubContext<FlightHub> hubContext,
                            ILogger<FlightService> logger)
        {
            _context = context;
            _hubContext = hubContext;
            _logger = logger;
        }
        public async Task<IEnumerable<FlightDto>> GetAllAsync()
        {
            var flights = await _context.Flights.ToListAsync();
            return flights.Select(f => new FlightDto(
                f.Id,
                f.FlightNumber,
                f.Destination,
                f.DepartureTime,
                f.Gate,
                FlightStatusCalculator.Calculate(f.DepartureTime).ToString()
            ));
        }
        public async Task<IEnumerable<FlightDto>> GetFilteredAsync(FlightStatus? status, string destination)
        {
            var flights = await _context.Flights.ToListAsync();
            return flights.Select(f => new FlightDto(
                f.Id,
                f.FlightNumber,
                f.Destination,
                f.DepartureTime,
                f.Gate,
                FlightStatusCalculator.Calculate(f.DepartureTime).ToString()
            )).Where(f => (f.Status == status?.ToString() || status == null) &&
                         (string.IsNullOrEmpty(destination) || f.Destination.Contains(destination)));

        }

        public async Task<FlightDto> CreateAsync(CreateFlightDto newFlight)
        {
            _logger.LogInformation("Creating flight {FlightNumber} to {Destination} at {DepartureTime} Through Gate {Gate}",
            newFlight.FlightNumber, newFlight.Destination, newFlight.DepartureTime,newFlight.Gate);

            var flight = new Flight
            {
                Id = Guid.NewGuid(),
                FlightNumber = newFlight.FlightNumber,
                Destination = newFlight.Destination,
                DepartureTime = newFlight.DepartureTime,
                Gate = newFlight.Gate
            };
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Flight {FlightId} created successfully", flight.Id);
            
            var createdFlightDto = new FlightDto(
               flight.Id,
               flight.FlightNumber,
               flight.Destination,
               flight.DepartureTime,
               flight.Gate,
               FlightStatusCalculator.Calculate(flight.DepartureTime).ToString()
            );
            await _hubContext.Clients.All.SendAsync("FlightCreated", createdFlightDto);
            return createdFlightDto;
        }

        public async Task DeleteAsync(Guid id)
        {
            _logger.LogInformation("Attempting to delete flight {FlightId}", id);
            var entity = await _context.Flights.FindAsync(id);
            if (entity == null)
            {
                _logger.LogWarning("Flight {FlightId} not found for deletion", id);
                return;
            }
            _context.Flights.Remove(entity);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Flight {FlightId} deleted successfully", id);
            await _hubContext.Clients.All.SendAsync("FlightDeleted", entity.Id);

        }

        public async Task<bool> IsUniqueFlightNumber(string flightNumber)
        {
            if (await _context.Flights.AnyAsync(f => f.FlightNumber == flightNumber))
            {
                return false;
            }
            return true;
        }
    }
}
