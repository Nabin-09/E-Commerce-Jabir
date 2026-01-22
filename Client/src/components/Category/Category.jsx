import "./Products.scss";
import { useNavigate } from "react-router-dom";

const STRAPI_URL = process.env.REACT_APP_API_URL.replace("/api", "");

const Products = ({ products, headingText }) => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
            {headingText && (
                <div className="sec-heading">{headingText}</div>
            )}

            <div className="products">
                {products?.map((item) => {
                    const imageUrl = item.img?.[0]?.url;

                    return (
                        <div
                            key={item.documentId}
                            className="product-card"
                            onClick={() =>
                                navigate(`/product/${item.documentId}`)
                            }
                        >
                            <div className="thumbnail">
                                <img
                                    src={
                                        imageUrl
                                            ? STRAPI_URL + imageUrl
                                            : "/placeholder.png"
                                    }
                                    alt={item.title}
                                />
                            </div>

                            <div className="prod-details">
                                <span className="name">{item.title}</span>
                                <span className="price">₹{item.price}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
