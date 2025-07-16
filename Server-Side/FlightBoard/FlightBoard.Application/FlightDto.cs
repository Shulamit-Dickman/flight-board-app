using FlightBoard.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightBoard.Application
{
    public record FlightDto(
    Guid Id,
    string FlightNumber,
    string Destination,
    DateTime DepartureTime,
    string Gate,
    string Status
);
}
