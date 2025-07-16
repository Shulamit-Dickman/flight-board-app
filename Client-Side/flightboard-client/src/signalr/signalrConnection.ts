import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export const createConnection = (): signalR.HubConnection => {
  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7031/hubs/flights') // או URL אחר
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection = newConnection;
  return newConnection;
};

export const getConnection = (): signalR.HubConnection | null => connection;