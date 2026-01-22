import "./Products.scss";
import { useNavigate } from "react-router-dom";
import { STRAPI_BASE_URL } from "../../utils/constants";

const Products = ({ products, headingText }) => {
  const navigate = useNavigate();

  return (
    <div className="products-container">
      {headingText && <div className="sec-heading">{headingText}</div>}

      <div className="products">
        {products?.map((item) => {
          const imageUrl = item.img?.[0]?.url
            ? `${STRAPI_BASE_URL}${item.img[0].url}`
            : "/placeholder.png";

          return (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="thumbnail">
                <img src={imageUrl} alt={item.title} />
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
