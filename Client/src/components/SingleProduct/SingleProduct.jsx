import "./SingleProduct.scss";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import { getImageUrl } from "../../utils/getImageUrl";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useContext(Context);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchDataFromApi(`/products/${id}?populate=*`)
      .then((res) => {
        setProduct(res?.data || null);
      })
      .catch(() => {
        setProduct(null);
      });
  }, [id]);

  if (!product) return null;

  // ✅ FIX: use product, not item
  const imageUrl = getImageUrl(product.img);

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={imageUrl} alt={product.title} />
          </div>

          <div className="right">
            <span className="name">{product.title}</span>
            <span className="price">₹{product.price}</span>
            <span className="desc">{product.desc}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={() => setQty((q) => Math.max(1, q - 1))}>-</span>
                <span>{qty}</span>
                <span onClick={() => setQty((q) => q + 1)}>+</span>
              </div>

              <button
                className="add-to-cart"
                onClick={() => addToCart(product, qty)}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
