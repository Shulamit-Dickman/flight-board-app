using FlightBoard.Application.Commands;
using FlightBoard.Domain.Enum;
using FlightBoard.Infrastructure.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace FlightBoard.Application.Validators
{
    public class CreateFlightDtoValidator : AbstractValidator<CreateFlightDto>
    {
        private readonly IFlightService _flightService;
        public CreateFlightDtoValidator(IFlightService flightService)
        {
            _flightService = flightService;

            RuleFor(f => f.FlightNumber)
                .NotEmpty().WithMessage(ErrorMessage.RequierdFlightNumber.ToString());
            //.Must((flightNumber) => IsUniqueFlightNumber(flightNumber)).WithMessage(ErrorMessage.FlightNumberExists.ToString())

            RuleFor(f => f.Gate)
               .NotEmpty().WithMessage(ErrorMessage.RequierdGate.ToString());


            RuleFor(f => f.Destination)
            .NotEmpty().WithMessage(ErrorMessage.RequierdDestination.ToString());

            RuleFor(f => f.DepartureTime)
               .NotEmpty().WithMessage(ErrorMessage.RequierdDepartureTime.ToString())
               .GreaterThan(DateTime.UtcNow).WithMessage(ErrorMessage.InvalidFutureDepartureTime.ToString());

        }

        //Work well with the following method but not safe enough

        //private bool IsUniqueFlightNumber(string flightNumber)
        //{
        //    return Task.Run(async () => await _flightService.ValidateUniqueFlightNumber(flightNumber)).Result;
        //}
    }
}
