import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer.js";
import Header from "../components/Header";
import { ProductContext } from "../context/ProductContext.js";

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
      {!isLoading &&
        categories.map((category) => {
          const { _id, categoryName, description, imageUrl } = category;

          return (
            <div
              className="main-container"
              key={_id}
              style={{ display: "flex",flexDirection:"row"}}
              onClick={() => handleCategoryChange(categoryName)}
            >
              <img
                src={imageUrl}
                alt={categoryName}
                width="200px"
                height="100px"
              />
              <h4>{categoryName} collection</h4>
              <p>{description}</p>

              {/* <Link to={{pathname:"/products",state:{from:location.pathname}}} onClick={()=>dispatch({type:"SET_SELECTED_CATEGORY",payload:[categoryName]})}>go </Link> */}
            </div>
          );
        })}
        <div onClick={clickHandler}>
          <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/138b2b0c-b88e-4667-95dd-9f72b41e94d1.__CR0,0,1464,625_PT0_SX1464_V1___.jpg" height="350px"width="100%"alt="fashion"/>
      
      </div>
      <Footer />
    </div>
  );
}
