import axios from "axios";

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpay = async ({ amount, onSuccess }) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // create order from backend
  const { data } = await axios.post(
    "http://localhost:1337/api/payment/create-order",
    { amount }
  );

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: data.order.amount,
    currency: "INR",
    name: "MyZenmart",
    description: "Order Payment",
    order_id: data.order.id,
    handler: function (response) {
      onSuccess(response);
    },
    theme: {
      color: "#8e2de2",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
