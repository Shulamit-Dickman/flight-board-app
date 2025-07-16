using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightBoard.Domain.Enum
{
    public enum ErrorMessage
    {
        RequierdFlightNumber,
        RequierdDestination,
        RequierdGate,
        RequierdDepartureTime,
        InvalidFutureDepartureTime,
        FlightNumberExists
    }
}
