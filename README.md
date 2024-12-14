# Vehicle Management API

A Node.js API for managing vehicles, allowing you to create, update, and list vehicles with statuses such as "Active," "Maintenance," and "Inactive."

## Features

- **Create a Vehicle:** Add new vehicles with an initial status.
- **Update Vehicle Status:** Modify the status of an existing vehicle.
- **List Vehicles:** Retrieve all vehicles with optional query filters.

## Installation

## API Endpoints

### Base URL

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

## Documentation

For complete API documentation, visit: [API Documentation](documentation-link)

## Demo

A live demo of the app is available at: [Vehicle Management Demo](demo-link)

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
