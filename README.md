# Flight Board App

## Project Description

**Flight Board App** is a real-time flight board management system. It provides a live flight dashboard where users can view and manage flights (add, delete) with instant updates. The application uses ASP.NET Core SignalR for real-time communication, allowing the server to push updates to all connected clients as they happen (no page refresh needed).
This means if one user modifies a flight, all other users’ dashboards sync immediately, keeping everyone up-to-date.

---

## Tech Stack

### Backend
- **.NET 8** – ASP.NET Core Web API
- **Entity Framework Core** – with SQLite database
- **SignalR** – for real-time updates between server and clients
- **FluentValidation** – input validation for flight forms
- **Serilog** – structured logging for key actions (e.g. create/delete flight)

### Frontend
- **React** + **TypeScript**
- **Redux Toolkit** – state management
- **Material UI (MUI)** – UI components
- **Tailwind CSS** – utility-first styling
- **TanStack Query** – for additional data caching and sync

---

## Features

- **Real-Time Updates** via SignalR (server pushes updates to all clients)
- **Flight CRUD**: create, read, delete operations
- **Live Status Updates** (e.g. “Boarding”, “Landed”)
- **Client Synchronization** – all users see the latest data instantly
- **Filtering Options** on flight list
- **Serilog Logging**:
  - Logs every flight creation and deletion to the console and to file
  - Example:
    ```
    [10:45:22 INF] Creating flight AA345 to USA at "2025-07-18T21:57:29.0960000Z" Through Gate B13.
    [10:47:55 INF] Flight "2aad40d9-756d-45d7-8c16-6f3c60c17b87" deleted successfully.
    ```

---

## Installation & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Shulamit-Dickman/flight-board-app.git
cd flight-board-app
```

---

### 2. Backend Setup (`Server-Side\FlightBoard`)

```bash
cd Server-Side
cd FlightBoard
dotnet restore
dotnet ef database update --startup-project FlightBoard.Api/FlightBoard.Api.csproj --project FlightBoard.Infrastructure/FlightBoard.Infrastructure.csproj
```

1. Open the solution file `FlightBoard.sln` located in the `Server-Side` directory.
2. Set the startup project to `FlightBoard.Api`.
3. Run the application by pressing `F5` or clicking `Start` in Visual Studio.

> By default, the server runs on `https://localhost:7031`

---

### 3. Frontend Setup (`Client-Side\flightboard-client`)

#### Environment Configuration

Before running the frontend, create a `.env` file inside the `Client-Side\flightboard-client` folder with the following content:

```env
REACT_APP_SERVER_API_URL=https://localhost:7031

```bash
cd Client-Side
cd flightboard-client
npm install
npm start
```

> By default, the frontend runs on `http://localhost:3000`

---

### 4. Usage

- Open your browser at `http://localhost:3000`
- Make changes (add/delete flights) via the UI
- Open the app in two browser tabs – you'll see real-time updates between them
- Watch the backend logs for Serilog output when creating or deleting flights

---

## Docker Support

Docker support is **planned** and will include:

- `Dockerfile` for backend and frontend
- `docker-compose.yml` for full local setup

---


## Author

Developed by **Shulamit Kolin [Dickman]**  
GitHub: [https://github.com/Shulamit-Dickman](https://github.com/Shulamit-Dickman)

---