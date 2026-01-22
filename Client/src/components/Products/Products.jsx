import "./Products.scss";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const Products = ({ products, headingText }) => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
            {headingText && (
                <div className="sec-heading">{headingText}</div>
            )}

            <div className="products">
                {products?.map((item) => {

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
                                    src={getImageUrl(item.img)}
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
