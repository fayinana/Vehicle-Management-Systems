import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/errorController";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes";
import AppError from "./utils/appError";

dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/v1/vehicles", vehicleRoutes);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("There is no route like this", 404));
});
app.use(globalErrorHandler);

export default app;
