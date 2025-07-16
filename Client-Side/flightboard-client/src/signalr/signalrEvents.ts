import { HubConnection } from '@microsoft/signalr';
import { AppDispatch } from '../app/store';
import { connected, disconnected, connectionError } from './signalrSlice';
import { QueryClient } from '@tanstack/react-query';
export const setupSignalREvents = (
    connection: HubConnection,
     dispatch: AppDispatch
     ,queryClient:QueryClient
     ) => {

  connection.onclose((error) => {
    console.warn('SignalR disconnected', error);
    dispatch(disconnected());
  });

  connection.onreconnected(() => {
    console.log('SignalR reconnected');
    dispatch(connected());
  });

  connection.onreconnecting(() => {
    console.log('SignalR reconnecting...');
  });

  // דוגמה: מאזין לשידור טיסה חדשה
  connection.on('FlightCreated', (flight) => {
    console.log('New flight received:', flight);
    queryClient.invalidateQueries({ queryKey: ['flights'] });
  });

  connection.on('FlightDeleted', (flightId) => {
    console.log('Flight deleted:', flightId);
    queryClient.invalidateQueries({ queryKey: ['flights'] });
  });
};