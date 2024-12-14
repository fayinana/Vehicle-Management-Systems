# Vehicle Management app Setup

[![Netlify Status](https://api.netlify.com/api/v1/badges/80a15524-a67d-4271-9298-e56f037f7b9b/deploy-status)](https://app.netlify.com/sites/vehicle-management-systems/deploys)
![Logo](https://raw.githubusercontent.com/fayinana/Vehicle-Management-Systems/refs/heads/main/FrontEnd/public/logo.png)

This document provides instructions to set up and run your full-stack application. The project is structured with separate `FrontEnd` and `BackEnd` directories within the root folder.

## Project Structure

```

/root
|-- BackEnd
| |-- src
| |-- package.json
| |-- tsconfig.json
|-- FrontEnd
|-- src
|-- package.json
|-- vite.config.js

```

---

## Prerequisites

Ensure the following software is installed on your system:

- **Node.js** (v16.x or later) and npm
- **TypeScript** (installed globally or via `devDependencies`)
- **Vite** (comes with the front-end setup)
- **cypress**
- **nodemon**

---

## Setup Instructions

### Clone the Repository

If you have not already, clone the repository:

```bash
git clone https://github.com/fayinana/Vehicle-Management-Systems
cd Vehicle-Management-Systems
```

### Install Dependencies

Navigate to the respective folders and install dependencies:

#### Backend

```bash
cd BackEnd
npm install
```

#### Frontend

```bash
cd FrontEnd
npm install
```

---

## Run the Application

### Backend

To start the backend server, navigate to the `BackEnd` folder and use the following commands:

#### Development Mode

```bash
npm run start:dev
```

This will start the server with `nodemon` for live reloading.

#### Production Mode

First, build the project:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start:prod
```

### Frontend

To start the frontend, navigate to the `FrontEnd` folder and use the following command:

#### Development Mode

```bash
npm run dev
```

This will start the Vite development server. Open the provided URL (usually `http://localhost:5173`) in your browser.

#### Production Mode

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Scripts Reference

### Backend Scripts

| Script       | Command                 | Description                        |
| ------------ | ----------------------- | ---------------------------------- |
| `start:dev`  | `nodemon src/server.ts` | Starts the backend in dev mode.    |
| `build`      | `tsc`                   | Compiles TypeScript to JavaScript. |
| `start:prod` | `node dist/index.js`    | Starts the production build.       |
| `test`       | `jest`                  | Runs tests.                        |
| `lint`       | `eslint . --ext .ts`    | Lints TypeScript files.            |
| `format`     | `prettier --write .`    | Formats the codebase.              |
| `test`       | `jest`                  | Test The Backend                   |

### Frontend Scripts

| Script    | Command        | Description                        |
| --------- | -------------- | ---------------------------------- |
| `dev`     | `vite`         | Starts the Vite dev server.        |
| `build`   | `vite build`   | Builds the app for production.     |
| `preview` | `vite preview` | Previews the production build.     |
| `lint`    | `eslint .`     | Lints JavaScript/TypeScript files. |
| `cy:open` | `cypress open` | To Test The App.                   |

---

## Environment Variables

Both the backend and frontend may require environment variables. Place your `.env` files in the respective directories.

### Backend Example

Create a `.env` file in the `BackEnd` directory:

```env
PORT=5000
DB_LOCAL=mongodb://localhost:27017/your-db-name
DATABASE=<mongodburl>
DB_PASSWORD=<mongodatlasspassword>
```

### Frontend Example

Create a `.env` file in the `FrontEnd` directory:

```env
VITE_API_BASE_URL=http://localhost:${PORT}/api
PORT=> the port the app running or 5000
```

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Troubleshooting

- **Dependency Issues**: Run `npm ci` to clean up and reinstall dependencies.
- **Build Errors**: Ensure TypeScript and other required tools are installed globally or in your `devDependencies`.
- **Backend Connectivity**: Verify your `.env` configuration, especially database URIs.

# Vehicle Management API

## Features

- **Create a Vehicle:** Add new vehicles with an initial status.
- **Update Vehicle Status:** Modify the status of an existing vehicle.
- **List Vehicles:** Retrieve all vehicles with optional query filters.

## API Endpoints

### Base URL

**Hosted URL** `https://vehicle-management-systems-api.onrender.com`

`http://localhost:<PORT>/api/v1/vehicles`

### Endpoints

1. **Get All Vehicles**

   ```http
   GET /api/v1/vehicles
   ```

   - Query parameters: Pagination, filtering, and sorting options.
   - Response: List of all vehicles.

2. **Add a Vehicle**

   ```http
   POST /api/v1/vehicles
   ```

   - Body:

     ```json
     {
       "name": "Vehicle Name",
       "status": "Active"
     }
     ```

   - Response: Created vehicle.

3. **Update Vehicle Status**

   ```http
   PATCH /api/v1/vehicles/:id
   ```

   - Body:

     ```json
     {
       "status": "Maintenance"
     }
     ```

   - Response: Updated vehicle.

## Running Tests

To run tests, use the following command:

```bash
npm test
```

Ensure the testing tools are configured:

- **Testing Library:** Jest
- **Linting:** ESLint
- **Test Command:** Runs the test suite and reports results.

## Demo

A live demo of the app is available at: [Vehicle Management System](https://vehicle-management-systems.netlify.app)

## Example Implementation

The following code demonstrates how to set up a router and models for the Vehicle Management API:

### Router

```javascript
import { Router } from "express";
import * as vehicleController from "./../controllers/vehicleController";

const router = Router();
router
  .route("/")
  .get(vehicleController.getVehicles)
  .post(vehicleController.addVehicle);
router.route("/:id").patch(vehicleController.updateVehicleStatus);
export default router;
```

### Vehicle Model

```javascript
import mongoose, { Schema, Document } from "mongoose";

interface IVehicle extends Document {
  name: string;
  status: "Active" | "Maintenance" | "Inactive";
  updatedAt: Date;
}

const VehicleSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model < IVehicle > ("Vehicle", VehicleSchema);
```

# Vehicle Dashboard Frontend

## Features

### 1. **Dashboard Overview**

- Intuitive layout for easy navigation and data management.
- Displays a list of vehicles with their statuses and details.

### 2. **Search, Sort, and Filter**

- Search by vehicle name for quick access to specific records.
- Sort vehicles by:
  - Name (A-Z or Z-A).
  - Update Date (Newest or Oldest).
- Filter vehicles by status (Active, Maintenance, Inactive).

### 3. **Pagination**

- Display vehicle data in paginated form for better performance and usability.
- Configurable number of items per page (e.g. 5, 10, 15, 20).
- Includes pre-fetching for seamless navigation between pages.

### 4. **Charts and Analytics**

- **Bar Chart** and **Pie Chart** to visualize vehicle statuses (Active, Maintenance, Inactive).
- Real-time updates for accurate data representation.

### 5. **Edit Vehicle Modal**

- Easily update vehicle details via a user-friendly modal.

## Tech Stack

### **Core Technologies:**

- **React**: Frontend framework for building the UI.
- **TypeScript**: Ensures type safety and scalability.
- **React Query**: For state management and data fetching.
- **Tailwind CSS**: For styling and responsiveness.

### **UI Components:**

- Custom components such as `Input`, `Select`, `VehicleTable`, `Pagination`, and `Charts` for a cohesive design.

### **Data Visualization:**

- `StatusBarChart` and `StatusPieChart` for graphical representation of data.

## Project Structure

- **`components/`**: Reusable UI components like tables, charts, inputs, and modals.
- **`hooks/`**: Custom hooks for data fetching and logic.
- **`pages/`**: Page components for routing.
- **`services/`**: API service functions.
- **`types/`**: TypeScript type definitions.

## API Integration

This frontend communicates with a backend API to fetch and manage vehicle data. The main API endpoints include:

- **`GET /vehicles`**: Fetches a paginated list of vehicles.
- **`POST /vehicles/:id`**: Updates a vehicle's details.
- **Additional Endpoints**: For sorting, filtering, and searching.
