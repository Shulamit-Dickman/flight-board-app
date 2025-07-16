import { createSlice } from '@reduxjs/toolkit';

type SignalRState = {
  connected: boolean;
  connecting: boolean;
  error: string | null;
};

const initialState: SignalRState = {
  connected: false,
  connecting: false,
  error: null,
};

const signalrSlice = createSlice({
  name: 'signalr',
  initialState,
  reducers: {
    connecting: (state) => {
      state.connecting = true;
      state.error = null;
    },
    connected: (state) => {
      state.connecting = false;
      state.connected = true;
    },
    disconnected: (state) => {
      state.connected = false;
    },
    connectionError: (state, action) => {
      state.connecting = false;
      state.error = action.payload;
    },
  },
});

export const { connected, disconnected, connectionError, connecting } = signalrSlice.actions;
export default signalrSlice.reducer;