import express, { type Application } from "express";

const configExpress = (app: Application) => {
  app.use(express.json());
};

export default configExpress;
