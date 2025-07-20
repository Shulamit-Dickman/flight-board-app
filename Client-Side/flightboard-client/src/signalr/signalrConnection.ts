import * as signalR from '@microsoft/signalr';
import { SIGNALR_HUB_URL } from '../config'
let connection: signalR.HubConnection | null = null;

export const createConnection = (): signalR.HubConnection => {
  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(SIGNALR_HUB_URL) 
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection = newConnection;
  return newConnection;
};

export const getConnection = (): signalR.HubConnection | null => connection;