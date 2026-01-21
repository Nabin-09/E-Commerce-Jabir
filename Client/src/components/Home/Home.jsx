import { useEffect, useContext } from "react";
import Banner from "./Banner/Banner";
import Category from "../Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    const {
        categories,
        setCategories,
        products,
        setProducts,
    } = useContext(Context);

    useEffect(() => {
        fetchDataFromApi("/categories?populate=*").then((res) => {
            setCategories(res.data);
        });

        fetchDataFromApi("/products?populate=*").then((res) => {
            setProducts(res.data);
        });
    }, []);

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
