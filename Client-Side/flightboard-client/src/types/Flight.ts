import { FlightStatus } from "./FlightStatus";

export type FlightDto = {
    flightNumber: string;
    destination: string;
    departureTime: string; 
    gate: string;
  }

  export type Flight = FlightDto & {
    id: string;
    status: FlightStatus;
  };