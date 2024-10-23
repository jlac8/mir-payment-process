import { stripe } from "../../../config/stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSubscription = async (priceId: string, userId: number) => {
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

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });

    await prisma.subscription.create({
      data: {
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        userId,
      },
    });

    return { subscriptionId: subscription.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
};
