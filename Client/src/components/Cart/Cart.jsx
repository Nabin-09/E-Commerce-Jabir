import "./Cart.scss";
import { MdClose, MdDelete } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { getImageUrl } from "../../utils/getImageUrl";

const Cart = ({ setShowCart }) => {
    const {
        cartItems,
        cartCount,
        cartSubTotal,
        handleRemoveFromCart,
        handleCartProductQuantity,
        proceedToCheckout,
    } = useContext(Context);

    return (
        <div className="cart-panel">
            <div className="opac-layer" onClick={() => setShowCart(false)} />

            <div className="cart-content">
                {/* Header */}
                <div className="cart-header">
                    <span className="heading">
                        Shopping Cart ({cartCount})
                    </span>
                    <span
                        className="close-btn"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose />
                    </span>
                </div>

                {/* Cart Body */}
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img
                                        src={getImageUrl(item.img)}
                                        alt={item.title}
                                    />

                                    <div className="item-details">
                                        <span className="name">
                                            {item.title}
                                        </span>

                                        <div className="quantity-buttons">
                                            <span
                                                onClick={() =>
                                                    handleCartProductQuantity(
                                                        "dec",
                                                        item
                                                    )
                                                }
                                            >
                                                -
                                            </span>
                                            <span>{item.quantity}</span>
                                            <span
                                                onClick={() =>
                                                    handleCartProductQuantity(
                                                        "inc",
                                                        item
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        </div>

                                        <div className="price-row">
                                            <span className="price">
                                                ₹{item.price * item.quantity}
                                            </span>

                                            <MdDelete
                                                className="delete"
                                                onClick={() =>
                                                    handleRemoveFromCart(item)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span>₹{cartSubTotal}</span>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={proceedToCheckout}
                            >
                                Pay ₹{cartSubTotal}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
