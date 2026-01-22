import { useNavigate } from "react-router-dom";
import "./Category.scss";

const STRAPI_URL = process.env.REACT_APP_DEV_URL;

const Category = ({ categories }) => {
    const navigate = useNavigate();

    return (
        <div className="shop-by-category">
            <div className="layout">
                <h2 className="section-heading">Shop by Category</h2>

                <div className="categories">
                    {categories?.map((item) => (
                        <div
                            key={item.documentId}
                            className="category"
                            onClick={() =>
                                navigate(`/category/${item.documentId}`)
                            }
                        >
                            <img
                                src={STRAPI_URL + item.img?.[0]?.url}
                                alt={item.title}
                            />
                            <span className="cat-name">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
