using FlightBoard.Application.Commands;
using FlightBoard.Domain.Entities;
using FlightBoard.Domain.Enum;
using FlightBoard.Domain.ValueObjects;
using FlightBoard.Infrastructure.Data;
using FlightBoard.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
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

        public FlightService(FlightDbContext context, IHubContext<FlightHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
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

        public async Task<FlightDto> CreateAsync(CreateFlightCommand cmd)
        {
            if (await _context.Flights.AnyAsync(f => f.FlightNumber == cmd.FlightNumber))
            {
                throw new Exception(ErrorMessage.FlightNumberExists.ToString());
            }

            var flight = new Flight
            {
                Id = Guid.NewGuid(),
                FlightNumber = cmd.FlightNumber,
                Destination = cmd.Destination,
                DepartureTime = cmd.DepartureTime,
                Gate = cmd.Gate
            };
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

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
            var entity = await _context.Flights.FindAsync(id);
            if (entity == null) return;
            _context.Flights.Remove(entity);
            await _context.SaveChangesAsync();
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
