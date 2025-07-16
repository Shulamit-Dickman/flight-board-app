using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightBoard.Domain.ValueObjects
{
    public enum FlightStatus
    {
        Scheduled,
        Boarding,
        Departed,
        Landed
    }

    public static class FlightStatusCalculator
    {
        public static FlightStatus Calculate(DateTime departure)
        {
            var now = DateTime.UtcNow;
            if (departure.Subtract(TimeSpan.FromMinutes(30)) <= now && now < departure)
                return FlightStatus.Boarding;
            if (departure <= now && now <= departure.AddMinutes(60))
                return FlightStatus.Departed;
            if (now > departure.AddMinutes(60))
                return FlightStatus.Landed;
            return FlightStatus.Scheduled;
        }
    }
}
