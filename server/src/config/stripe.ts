import Stripe from "stripe";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe API key is not defined. Check your .env file.");
}

export { stripe };
