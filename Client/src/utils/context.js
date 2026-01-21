import { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "./api";
import axios from "axios";

export const Context = createContext();

const AppContext = ({ children }) => {
    // ----------------------------
    // PRODUCT & CATEGORY STATE
    // ----------------------------
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // ----------------------------
    // CART STATE
    // ----------------------------
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);

    // ----------------------------
    // FETCH DATA (ON APP LOAD)
    // ----------------------------
    useEffect(() => {
        fetchDataFromApi("/categories?populate=*").then((res) => {
            setCategories(res?.data || []);
        });

        fetchDataFromApi("/products?populate=*").then((res) => {
            setProducts(res?.data || []);
        });
    }, []);

    // ----------------------------
    // CART LOGIC
    // ----------------------------
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

    // ----------------------------
    // ADD TO CART
    // ----------------------------
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
    const proceedToCheckout = async () => {
    try {
        if (cartSubTotal <= 0) {
            alert("Cart is empty");
            return;
        }

        // 1. Create order on backend
        const res = await axios.post(
            "http://localhost:1337/api/payment/createOrder",
            {
                amount: cartSubTotal,
            }
        );

        const { order } = res.data;

        // 2. Razorpay options
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "MyZenmart",
            description: "Checkout Payment",
            order_id: order.id,
            handler: async function (response) {
                // OPTIONAL: verify payment later
                console.log("Payment success", response);

                // Clear cart
                setCartItems([]);

                // Redirect
                window.location.href = "/success";
            },
            theme: {
                color: "#8e2de2",
            },
        };

        // 3. Open Razorpay
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        console.error("Checkout error", error);
        alert("Checkout failed");
    }
};


    // ----------------------------
    // REMOVE FROM CART
    // ----------------------------
    const handleRemoveFromCart = (product) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== product.id)
        );
    };

    // ----------------------------
    // UPDATE CART QTY
    // ----------------------------
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

    // ----------------------------
    // CONTEXT PROVIDER
    // ----------------------------
    return (
        <Context.Provider
            value={{
                // data
                categories,
                setCategories,
                products,
                setProducts,

                // cart
                cartItems,
                cartCount,
                cartSubTotal,
                addToCart,
                handleRemoveFromCart,
                handleCartProductQuantity,
                proceedToCheckout
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
