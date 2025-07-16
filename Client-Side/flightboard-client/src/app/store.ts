import { configureStore } from '@reduxjs/toolkit';
import signalrReducer from '../signalr/signalrSlice';
import filterReducer from '../features/filters/filtersSlice'
import flightFormReducer from '../features/flights/flightFormSlice';

export const store = configureStore({
  reducer: {
    signalr: signalrReducer,
    filters : filterReducer,
    flightForm:flightFormReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;