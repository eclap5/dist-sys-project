import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";

import apiPath from "./routes/api";

const app: Express = express();

app.use(express.json());
/* app.use(express.urlencoded({ extended: true })); */
app.use(morgan("dev"));

app.use("/api", apiPath);
const port: number = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
