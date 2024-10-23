import type { Request, Response } from "express";
import { createSubscription } from "./createSubscription.service";
import { z } from "zod";

export const createSubscriptionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const schema = z.object({
    priceId: z.string(),
    userId: z.number().int().positive(),
  });

  try {
    const { priceId, userId } = schema.parse(req.body);
    const result = await createSubscription(priceId, userId);
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
