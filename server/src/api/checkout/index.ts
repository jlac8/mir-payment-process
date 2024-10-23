import { Router } from "express";
import { createPaymentIntentController } from "./payment/createPaymentIntent.controller";
import { createSubscriptionController } from "./subscription/createSubscription.controller";

const router = Router();

router.post("/create-payment-intent", createPaymentIntentController);
router.post("/create-subscription", createSubscriptionController);

export default router;
