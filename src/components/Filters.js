import { useContext } from "react";
import "./Filters.css";
import { ProductContext } from "../context/ProductContext";

export default function Filters() {
  const { state, dispatch } = useContext(ProductContext);
  return (
    <div className="filter-container">
      <div className="filter-header">
        <h5>Filters</h5>
        <button
          onClick={() => {
            dispatch({ type: "CLEAR_FILTERS" });
            console.log("clear");
          }}
          id="clear-btn"
        >
          Clear
        </button>
      </div>
      <PriceSelector
        onPriceChange={(price) =>
          dispatch({ type: "SET_SELECTED_PRICE", payload: price })
        }
      />
      <CategorySelector
        onCategoryChange={(categories) =>
          dispatch({ type: "SET_SELECTED_CATEGORY", payload: categories })
        }
      />
      <RatingSelector
        state={state}
        onRatingChange={(rating) =>
          dispatch({ type: "SET_SELECTED_RATING", payload: rating })
        }
      />
      <SortOrderSelector
        onSortOrderChange={(sortOrder) =>
          dispatch({ type: "SET_SORT_ORDER", payload: sortOrder })
        }
      />
    </div>
  );
}
function PriceSelector({ onPriceChange }) {
  return (
    <div className="price-container">
      <h5>Price</h5>
      <div className="price-range">
        <label>500</label>
        <label>1000</label>
        <label>1500</label>
      </div>

      <input
        style={{ accentColor: "grey", width: "60%" }}
        type="range"
        min="500"
        max="1500"
        steps="500"
        onChange={(e) => onPriceChange(e.target.value)}
      />
    </div>
  );
}

function CategorySelector({ onCategoryChange }) {
  const { state } = useContext(ProductContext);
  const handleCategoryChange = (categoryName) => {
    const updatedCategories = state.selectedCategories.includes(categoryName)
      ? state.selectedCategories.filter((cat) => cat !== categoryName)
      : [...state.selectedCategories, categoryName];
    onCategoryChange(updatedCategories);
  };
  
  return (
    <div>
      <h5>Category</h5>
      <div>
        <input  style={{ accentColor: "grey"}}
          type="checkbox"
          checked={state.selectedCategories.includes("men")}
          value="men"
          onChange={() => handleCategoryChange("men")}
        />
        <label>Men clothing</label>
      </div>
      <div>
        <input
          type="checkbox"  style={{ accentColor: "grey"}}
          checked={state.selectedCategories.includes("women")}
          value="women"
          onChange={() => handleCategoryChange("women")}
        />
        <label>Women clothing</label>
      </div>
      <div>
        <input
          type="checkbox" style={{ accentColor: "grey"}}
          checked={state.selectedCategories.includes("kids")}
          value="kids"
          onChange={() => handleCategoryChange("kids")}
        />
        <label>kids clothing</label>
      </div>
    </div>
  );
}
function RatingSelector({ onRatingChange, state }) {
  return (
    <div>
      <h5>Rating</h5>
      <div>
        <input
         style={{ accentColor: "grey"}}
          type="radio"
          checked={state.selectedRating === "4"}
          name="rate"
          value="4"
          onChange={(e) => onRatingChange(e.target.value)}
        />
        <label>4 stars & above</label>
      </div>
      <div>
        <input
          type="radio"
          style={{ accentColor: "grey"}}
          checked={state.selectedRating === "3"}
          name="rate"
          value="3"
          onChange={(e) => onRatingChange(e.target.value)}
        />
        <label>3 stars & above</label>
      </div>
      <div>
        <input
         style={{ accentColor: "grey"}}
          type="radio"
          checked={state.selectedRating === "2"}
          name="rate"
          value="2"
          onChange={(e) => onRatingChange(e.target.value)}
        />
        <label>2 stars & above</label>
      </div>
      <div>
        <input
          type="radio"
          style={{ accentColor: "grey"}}
          checked={state.selectedRating === "1"}
          name="rate"
          value="1"
          onChange={(e) => onRatingChange(e.target.value)}
        />
        <label>1 stars & above</label>
      </div>
    </div>
  );
}

function SortOrderSelector({ onSortOrderChange }) {
  return (
    <div>
      <h5>Sort by</h5>
      <div>
        <input
         style={{ accentColor: "grey"}}
          type="radio"
          name="sort"
          value="HTL"
          onChange={(e) => onSortOrderChange(e.target.value)}
        />
        <label>Price-high to low</label>
      </div>
      <div>
        <input
         style={{ accentColor: "grey"}}
          type="radio"
          name="sort"
          value="LTH"
          onChange={(e) => onSortOrderChange(e.target.value)}
        />
        <label>Price-low to high</label>
      </div>
    </div>
  );
}
