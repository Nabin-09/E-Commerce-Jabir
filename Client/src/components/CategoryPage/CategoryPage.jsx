import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const { id } = useParams(); // documentId
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDataFromApi(
      `/products?populate=*&filters[categories][documentId][$eq]=${id}`
    )
      .then((res) => {
        setProducts(res?.data || []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="category-page">
      <div className="layout">
        <h2 className="category-title">Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <Products products={products} />
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
