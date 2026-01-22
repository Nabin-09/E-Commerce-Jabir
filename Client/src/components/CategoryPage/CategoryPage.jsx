import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";

import "./CategoryPage.scss";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetchDataFromApi(
    `/products?populate=*&filters[categories][id][$eq]=${id}`
  ).then((res) => {
    setProducts(res.data || []);
  });
}, [id]);


  return (
    <div className="category-page">
      <div className="layout">
        <h2 className="category-title">Products</h2>

        {products.length > 0 ? (
          <Products products={products} />
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
