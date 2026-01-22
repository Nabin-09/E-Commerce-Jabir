import { useNavigate } from "react-router-dom";
import "./Category.scss";

const STRAPI_URL = process.env.REACT_APP_DEV_URL;


const Category = ({ categories }) => {
    const navigate = useNavigate();

    return (
        <div className="shop-by-category">
            <h2 className="sec-heading">Shop by Category</h2>

            <div className="categories">
                {categories?.map((item) => {
                    const imageUrl = item.img?.[0]?.url;

                    return (
                        <div
                            key={item.id}
                            className="category"
                            onClick={() =>
                                navigate(`/category/${item.documentId}`)
                            }
                        >
                            <img
                                src={
                                    imageUrl
                                        ? STRAPI_URL + imageUrl
                                        : "/placeholder.png"
                                }
                                alt={item.title}
                            />
                            <span className="cat-name">{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
