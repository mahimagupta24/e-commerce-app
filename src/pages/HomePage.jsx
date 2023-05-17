import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { categoryHandler, products, setProducts } =
    useContext(ProductContext);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = JSON.parse(response._bodyText);
      //   const {status,data} = await response.json()
      if (response.status === 200) {
        console.log(data.categories);
        setCategories(data.categories);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  
  const clickHandler = () => {
    setProducts(products);
    navigate("/products");
  };
  return (
    <div>
      {categories.map((category) => {
        const { _id, categoryName, description } = category;
        return (
          <div key={_id}>
            <h4>{categoryName} collection</h4>
            <p>{description}</p>
            <button onClick={() => categoryHandler(categoryName)}>go </button>
          </div>
        );
      })}
      <button onClick={clickHandler}>Shop now</button>
    </div>
  );
}
