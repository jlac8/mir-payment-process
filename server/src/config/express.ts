import express, { type Application } from "express";
import cors from "cors";

const configExpress = (app: Application) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json());
};

export default configExpress;
