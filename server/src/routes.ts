import type { Application } from "express";
import checkoutRoutes from "./api/checkout";

function routes(app: Application): void {
  app.use("/api/checkout", checkoutRoutes);
}

export default routes;
