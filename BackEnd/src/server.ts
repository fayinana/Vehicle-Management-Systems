import app from "./app";
import mongoose from "mongoose";

const DB = process.env.LOCAL_DATABASE;

mongoose
  .connect(DB || "mongodb://127.0.0.1:27017/vehicle-app")
  .then(() => {
    console.log(`DB connected successfully`);
  })
  .catch((error) => console.log("DB connection error: ", error));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default server;
