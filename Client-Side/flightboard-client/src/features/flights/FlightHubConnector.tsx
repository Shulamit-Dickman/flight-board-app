import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createConnection } from '../../signalr/signalrConnection';
import { setupSignalREvents } from '../../signalr/signalrEvents';
import { connected, connecting, connectionError } from '../../signalr/signalrSlice';
import { useQueryClient } from '@tanstack/react-query';

const FlightHubConnector: React.FC = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const connect = async () => {
      try {
        dispatch(connecting());
        const connection = createConnection();
        setupSignalREvents(connection, dispatch,queryClient);
        await connection.start();
        dispatch(connected());
      } catch (err) {
        console.error('Connection failed', err);
        dispatch(connectionError((err as Error).message));
      }
    };

    connect();
  }, [dispatch,queryClient]);

  return null; 
};

export default FlightHubConnector;