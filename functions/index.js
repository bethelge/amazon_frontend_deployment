const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Root Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// Payment Endpoint
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total, 10); // Ensure total is a number

    if (isNaN(total) || total <= 0) {
      return res.status(400).json({
        message: "Total must be a valid number greater than 0",
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
});

// Export API
exports.api = onRequest(app);
