import { createContext, useEffect, useState } from "react";
import  { fetchDataFromApi } from "./api";

export const Context = createContext();

const AppContext = ({ children }) => {
    // =========================
    // PRODUCT & CATEGORY STATE
    // =========================
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // =========================
    // CART STATE
    // =========================
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);

    // =========================
    // FETCH DATA (ON APP LOAD)
    // =========================
    useEffect(() => {
        fetchDataFromApi("/categories?populate=*").then((res) => {
            setCategories(res?.data || []);
        });

        fetchDataFromApi("/products?populate=*").then((res) => {
            setProducts(res?.data || []);
        });
    }, []);

    // =========================
    // UPDATE CART TOTALS
    // =========================
    useEffect(() => {
        let count = 0;
        let total = 0;

        cartItems.forEach((item) => {
            count += item.quantity;
            total += item.price * item.quantity;
        });

        setCartCount(count);
        setCartSubTotal(total);
    }, [cartItems]);

    // =========================
    // ADD TO CART
    // =========================
    const addToCart = (product, qty) => {
        setCartItems((prev) => {
            const existing = prev.find((p) => p.id === product.id);

            if (existing) {
                return prev.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + qty }
                        : p
                );
            }

            return [...prev, { ...product, quantity: qty }];
        });
    };

    // =========================
    // REMOVE FROM CART
    // =========================
    const handleRemoveFromCart = (product) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== product.id)
        );
    };

    // =========================
    // UPDATE CART QUANTITY
    // =========================
    const handleCartProductQuantity = (type, product) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === product.id) {
                    if (type === "inc") {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    if (type === "dec" && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                }
                return item;
            })
        );
    };

    // =========================
    // CHECKOUT (RAZORPAY)
    // =========================
    const proceedToCheckout = async () => {
        try {
            if (cartSubTotal <= 0) {
                alert("Cart is empty");
                return;
            }

            // Create order on backend (Render)
            const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/payment/createOrder`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cartSubTotal }),
    }
);

const data = await res.json();
const { order } = data;



            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "MyZenmart",
                description: "Checkout Payment",
                order_id: order.id,
                handler: () => {
                    setCartItems([]);
                    window.location.href = "/success";
                },
                theme: {
                    color: "#8e2de2",
                },
            };

            new window.Razorpay(options).open();
        } catch (error) {
            console.error("Checkout error", error);
            alert("Checkout failed");
        }
    };

    // =========================
    // CONTEXT PROVIDER
    // =========================
    return (
        <Context.Provider
            value={{
                categories,
                products,

                cartItems,
                cartCount,
                cartSubTotal,
                addToCart,
                handleRemoveFromCart,
                handleCartProductQuantity,
                proceedToCheckout,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
