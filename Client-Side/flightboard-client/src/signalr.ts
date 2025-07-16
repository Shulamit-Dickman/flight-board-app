import { HubConnectionBuilder,LogLevel } from "@microsoft/signalr";

const connection = new HubConnectionBuilder()
  .withUrl("/hubs/flights")
  .withAutomaticReconnect([0, 2000, 10000, 30000])//TODO
  .configureLogging(LogLevel.Information)
  .build();

  connection.onreconnecting(() => {
    console.log('SignalR reconnecting...');
  });
  
  connection.onreconnected(() => {
    console.log('SignalR reconnected!');
  });
  
  connection.onclose(() => {
    console.log('SignalR connection closed');
  });
export default connection;