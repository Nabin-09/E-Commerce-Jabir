"use strict";

const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports = {
  async createOrder(ctx) {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const { amount } = ctx.request.body;

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      ctx.send({ order });
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async verify(ctx) {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = ctx.request.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      ctx.send({ success: true });
    } else {
      ctx.throw(400, "Payment verification failed");
    }
  },
};
