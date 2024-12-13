// src/handlers/vehicleHandlers.ts
import { NextFunction, Request, Response } from "express";
import Vehicle from "../models/VehicleModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

export const addVehicle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, status } = req.body;

    const vehicle = await Vehicle.create({ name, status });

    res.status(201).json({
      status: "success",
      vehicle,
    });
  }
);

export const updateVehicleStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;
    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    if (!vehicle) {
      return next(
        new AppError("Invalid ID: no vehicle found with that ID", 404)
      );
    }
    res.status(200).json({
      status: "success",
      vehicle,
    });
  }
);

export const getVehicles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let filter: Record<string, any> = {};
    const features = new APIFeatures(Vehicle.find(filter), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const vehicles = await features.query;
    res.status(200).json({
      status: "success",
      result: vehicles.length,
      vehicles,
    });
  }
);
