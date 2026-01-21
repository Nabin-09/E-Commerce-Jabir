import "./Success.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="success-wrapper">
            <div className="success-card">
                <div className="icon">✓</div>
                <h1>Payment Successful</h1>
                <p>
                    Thank you for shopping with MyZenmart.  
                    Your order has been placed successfully.
                </p>

                <button onClick={() => navigate("/")}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Success;
