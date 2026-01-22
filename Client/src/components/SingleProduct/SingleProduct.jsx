import "./SingleProduct.scss";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";

import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import { getImageUrl } from "../../utils/getImageUrl";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useContext(Context);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchDataFromApi(`/api/products/${id}?populate=*`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return null;

  const imageUrl = getImageUrl(product.img?.[0]?.url);
  const category = product.categories?.[0]?.title;

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
                <span onClick={() => setQty(q => Math.max(1, q - 1))}>-</span>
                <span>{qty}</span>
                <span onClick={() => setQty(q => q + 1)}>+</span>
              </div>

              <button
                className="add-to-cart"
                onClick={() => addToCart(product, qty)}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <div className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category: <span>{category}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF />
                  <FaTwitter />
                  <FaInstagram />
                  <FaLinkedinIn />
                  <FaPinterest />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
