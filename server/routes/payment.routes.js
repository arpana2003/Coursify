import { Router } from "express";
import { allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import {isLoggedIn,authorizedRoles, authorizeSubscriber} from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/razorpay-key").get(isLoggedIn,getRazorpayApiKey);

router.route("/subscribe").post(isLoggedIn,buySubscription);

router.route("/verify").post(isLoggedIn,verifySubscription);

router.route("/unsubscribe").post(isLoggedIn,authorizeSubscriber,cancelSubscription);

router.route("/").get(isLoggedIn,authorizedRoles('ADMIN'),allPayments);

export default router;
