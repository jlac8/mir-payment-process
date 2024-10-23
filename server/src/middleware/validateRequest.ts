import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

/**
 * Middleware for validating incoming requests using a Zod schema.
 * @template T - The expected shape of the request body, inferred from the Zod schema.
 * @param schema - The Zod schema used to validate the request body.
 * @returns Middleware function that validates the request body and returns an error response if validation fails.
 */
export const validateRequest =
  <T>(schema: ZodSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation error",
          errors,
        });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
