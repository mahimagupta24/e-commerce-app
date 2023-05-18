
import "./Filters.css";

export default function Filters() {
  

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h5>Filters</h5>
        <button id="clear-btn">Clear</button>
      </div>
      <PriceSelector />
      <CategorySelector />
      <RatingSelector />
      <SortOrderSelector />
    </div>
  );
}
function PriceSelector() {
  return (
    <div className="price-container">
      <h5>Price</h5>
      <div className="price-range">
        <label>50</label>
        <label>100</label>
        <label>150</label>
      </div>

      <input type="range" />
    </div>
  );
}

function CategorySelector() {
  
  return (
    <div>
      <h5>Category</h5>
      <div>
        <input type="checkbox"/>
        <label>Men clothing</label>
      </div>
      <div>
        <input type="checkbox" />
        <label>Women clothing</label>
      </div>
      <div>
        <input type="checkbox" />
        <label>kids clothing</label>
      </div>
    </div>
  );
}
function RatingSelector() {
  return (
    <div>
      <h5>Rating</h5>
      <div>
        <input type="radio" />
        <label>4 stars & above</label>
      </div>
      <div>
        <input type="radio" />
        <label>3 stars & above</label>
      </div>
      <div>
        <input type="radio" />
        <label>2 stars & above</label>
      </div>
      <div>
        <input type="radio" />
        <label>1 stars & above</label>
      </div>
    </div>
  );
}

function SortOrderSelector() {
  return (
    <div>
      <h5>Sort by</h5>
      <div>
        <input
          type="radio"
          name="sort"
          
            
        />
        <label>Price-high to low</label>
      </div>
      <div>
        <input
          type="radio"
          name="sort"
            
        />
        <label>Price-low to high</label>
      </div>
    </div>
  );
}
