using FlightBoard.Domain.Entities;
using FlightBoard.Domain.ValueObjects;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace FlightBoard.Tests
{
    public class ApplicationTests
    {
        [Theory]
        [InlineData(0.25, FlightStatus.Boarding)]
        [InlineData(-0.30, FlightStatus.Departed)]
        [InlineData(-2, FlightStatus.Landed)]
        [InlineData(1, FlightStatus.Scheduled)]
        [InlineData(0, FlightStatus.Departed)]
        public void CalculateStatus_ReturnsExpectedStatus(double hours,FlightStatus expectedStatus)
        {
            var flight = new Flight{ DepartureTime = DateTime.UtcNow.AddHours(hours)};
            var status = FlightStatusCalculator.Calculate(flight.DepartureTime);
            status.Should().Be(expectedStatus);
        }

        public void ValidateFlight( )
        {

        }
    }
}
