import dotenv from "dotenv";
import express, { type Application } from "express";
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

import configExpress from "./config/express";
import routes from "./routes";

const app: Application = express();

configExpress(app);
routes(app);

export default app;
