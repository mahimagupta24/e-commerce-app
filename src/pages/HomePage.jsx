import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/Header";
import { ProductContext } from "../context/ProductContext.js";
import "./HomePage.css";

export default function Home() {
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();
  // const location = useLocation()
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.status === 200) {
        const data = await response.json();
        const categories = data.categories;
        setCategories(categories);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const clickHandler = () => {
    navigate("/products");
  };

  const handleCategoryChange = (categoryName) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: [categoryName],
    });
    navigate("/products");
  };

  return (
    <div>
      <Header />
      {isLoading && <p>Loading...</p>}
      <ul className="main-container">
        {!isLoading &&
          categories.map((category) => {
            const { _id, categoryName, description, imageUrl } = category;

            return (
              <li
                className="category-card"
                key={_id}
                onClick={() => handleCategoryChange(categoryName)}
              >
                <img
                  className="category-image"
                  src={imageUrl}
                  alt={categoryName}
                  width="320px"
                  height="200px"
                />
                <h4>{categoryName} collection</h4>
                <p>{description}</p>
              </li>
            );
          })}
      </ul>
      <div className="img"onClick={clickHandler}>
        <img 
          src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/138b2b0c-b88e-4667-95dd-9f72b41e94d1.__CR0,0,1464,625_PT0_SX1464_V1___.jpg"
           height="300px"
          width="100%"
          alt="fashion"
        />
        
      </div>
      <Footer />
    </div>
  );
}
