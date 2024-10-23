import { stripe } from "../../../config/stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPaymentIntent = async (
  amount: number,
  currency: string,
  userId: number
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
    });

    await prisma.transaction.create({
      data: {
        amount,
        currency,
        status: "pending",
        userId,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
};
