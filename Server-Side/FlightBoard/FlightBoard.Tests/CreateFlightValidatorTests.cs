using FlightBoard.Application;
using FlightBoard.Application.Commands;
using FlightBoard.Application.Validators;
using FlightBoard.Domain.Entities;
using FlightBoard.Infrastructure.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Moq;


namespace FlightBoard.Tests
{
    public class CreateFlightValidatorTests
    {
        private readonly Mock<IFlightService> _flightServiceMock;
        private readonly CreateFlightDtoValidator _validator;

        public CreateFlightValidatorTests()
        {
            _flightServiceMock = new Mock<IFlightService>();
            _flightServiceMock.Setup(s => s.IsUniqueFlightNumber(It.IsAny<string>()))
                .ReturnsAsync(true);

            _validator = new CreateFlightDtoValidator(_flightServiceMock.Object);
        }

        [Fact]
        public async Task FlightNumber_IsRequired()
        {
            var command = new CreateFlightCommand
            {
                FlightNumber = "",
                Gate = "A1",
                Destination = "USA",
                DepartureTime = DateTime.UtcNow.AddHours(1)
            };

            var result = await _validator.ValidateAsync(command);

            Assert.False(result.IsValid);
            Assert.Contains(result.Errors, e => e.PropertyName == "FlightNumber");
        }


        [Fact]
        public async Task Destination_IsRequired()
        {
            var command = new CreateFlightCommand
            {
                FlightNumber = "AA123",
                Gate = "A1",
                Destination = "",
                DepartureTime = DateTime.UtcNow.AddHours(1)
            };

            var result = await _validator.ValidateAsync(command);

            Assert.False(result.IsValid);
            Assert.Contains(result.Errors, e => e.PropertyName == "Destination");
        }
        [Fact]
        public async Task Gate_IsRequired()
        {
            var command = new CreateFlightCommand
            {
                FlightNumber = "AA123",
                Gate = "",
                Destination = "USA",
                DepartureTime = DateTime.UtcNow.AddHours(1)
            };

            var result = await _validator.ValidateAsync(command);

            Assert.False(result.IsValid);
            Assert.Contains(result.Errors, e => e.PropertyName == "Gate");
        }

        [Fact]
        public async Task DepartureTime_IsInFuture()
        {
            var command = new CreateFlightCommand
            {
                FlightNumber = "AA123",
                Gate = "A1",
                Destination = "USA",
                DepartureTime = DateTime.UtcNow.AddHours(-1)
            };

            var result = await _validator.ValidateAsync(command);

            Assert.False(result.IsValid);
            Assert.Contains(result.Errors, e => e.PropertyName == "DepartureTime");
        }

        [Fact]
        public async Task FlightNumber_IsUnique()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<FlightDbContext>()
                .UseSqlite(connection)
                .Options;

            using var context = new FlightDbContext(options);
            context.Database.EnsureCreated();

            context.Flights.Add(new Flight
            {
                Id = Guid.NewGuid(),
                FlightNumber = "AB234",
                Destination = "USA",
                DepartureTime = DateTime.UtcNow.AddHours(1),
                Gate = "A1"
            });
            context.SaveChanges();

            var service = new FlightService(context, null);

            var isUnique = await service.IsUniqueFlightNumber("AB234");
            Assert.False(isUnique);
        }

 

        [Fact]
        public async Task Valid_Flight_Creation()
        {
            _flightServiceMock.Setup(s => s.IsUniqueFlightNumber("AB234"))
                .ReturnsAsync(true);

            var command = new CreateFlightCommand
            {
                FlightNumber = "AC235",
                Gate = "A1",
                Destination = "USA",
                DepartureTime = DateTime.UtcNow.AddHours(1)
            };

            var result = await _validator.ValidateAsync(command);

            Assert.True(result.IsValid);
            Assert.Empty(result.Errors);
        }

    }
}
