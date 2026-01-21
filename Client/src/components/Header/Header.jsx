import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "../../utils/context";


import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import "./Header.scss";

const Header = () => {
    const { cartCount } = useContext(Context);


    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCategoryClick = () => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                document
                    .querySelector(".shop-by-category")
                    ?.scrollIntoView({ behavior: "smooth" });
            }, 200);
        } else {
            document
                .querySelector(".shop-by-category")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
                <div className="header-content">
                    <ul className="left">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li>About</li>
                        <li onClick={handleCategoryClick}>Categories</li>
                    </ul>

                    <div className="center" onClick={() => navigate("/")}>
                        MyZenmart
                    </div>

                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)} />
                        <AiOutlineHeart />
                        <span
                            className="cart-icon"
                            onClick={() => setShowCart(true)}
                        >
                            <CgShoppingCart />
                            {cartCount > 0 && <span>{cartCount}</span>}

                        </span>
                    </div>
                </div>
            </header>

            {showCart && <Cart setShowCart={setShowCart} />}
            {showSearch && <Search setShowSearch={setShowSearch} />}
        </>
    );
};

export default Header;
