import { useContext } from "react";
import Banner from "./Banner/Banner";
import Category from "../Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";

const Home = () => {
    const { categories, products } = useContext(Context);

    return (
        <>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Products
                        products={products}
                        headingText="Popular Products"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
