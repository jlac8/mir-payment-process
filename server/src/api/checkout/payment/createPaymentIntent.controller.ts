import type { Request, Response } from "express";
import { createPaymentIntent } from "./createPaymentIntent.service";
import { z } from "zod";

export const createPaymentIntentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schema = z.object({
    amount: z.number().int().positive(),
    currency: z.string(),
    userId: z.number().int().positive(),
  });

  try {
    const { amount, currency, userId } = schema.parse(req.body);

    const result = await createPaymentIntent(amount, currency, userId);

    res.json(result);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }

    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Unknown error occurred" });
  }
};
