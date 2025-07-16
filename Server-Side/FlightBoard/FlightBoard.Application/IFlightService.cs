using FlightBoard.Application.Commands;
using FlightBoard.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightBoard.Application
{
    public interface IFlightService
    {
        Task<IEnumerable<FlightDto>> GetAllAsync();
        Task<IEnumerable<FlightDto>> GetFilteredAsync(FlightStatus? status , string destination);
        Task<FlightDto> CreateAsync(CreateFlightCommand cmd);
        Task DeleteAsync(Guid id);
        Task<bool> IsUniqueFlightNumber(string flightNumber);
    }
}
