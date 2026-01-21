"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment/createOrder",
      handler: "payment.createOrder",
    },
    {
      method: "POST",
      path: "/payment/verify",
      handler: "payment.verify",
    },
  ],
};
