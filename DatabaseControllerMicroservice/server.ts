import express, { Express } from "express";
import morgan from "morgan";

import apiPath from "./routes/api";

const PORT: number = 3001;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", apiPath);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
