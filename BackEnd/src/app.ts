import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/errorController";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes";
import AppError from "./utils/appError";

dotenv.config({ path: require("path").resolve(__dirname, "./.env") });

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://vehicle-management-systems.netlify.app",
      "http://localhost:3000",
      "http://localhost:5071",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/vehicles", vehicleRoutes);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("There is no route like this", 404));
});

app.use(globalErrorHandler);

export default app;
