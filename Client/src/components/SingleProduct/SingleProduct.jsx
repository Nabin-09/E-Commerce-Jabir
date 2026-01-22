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



const SingleProduct = () => {
    const { id } = useParams();
    const { addToCart } = useContext(Context);
    const imageUrl = product.img?.[0]?.url;

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        fetchDataFromApi(`/products/${id}?populate=*`).then((res) => {
            setProduct(res.data);
        });
    }, [id]);

    if (!product) return null;
    const category = product.categories?.[0]?.title;

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    {/* LEFT */}
                    <div className="left">
                        
<img
  src={imageUrl || "/placeholder.png"}
  alt={product.title}
/>
                    </div>

                    {/* RIGHT */}
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <span className="price">₹{product.price}</span>
                        <span className="desc">{product.desc}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={() => setQty((p) => Math.max(1, p - 1))}>
                                    -
                                </span>
                                <span>{qty}</span>
                                <span onClick={() => setQty((p) => p + 1)}>+</span>
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
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
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
