import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  filterProducts,
  updateFavoriteList,
} from "../functions/product.functions";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorite, setFavorite] = useState();
  const { isLoggedIn, user } = useContext(AuthContext);

  const api_url = `http://localhost:5005/products`;

  useEffect(() => {
    fetchAllProducts(api_url, setProducts);
    fetchAllProducts(api_url, setFilteredProducts);
  }, []);

  useEffect(() => {
    filterProducts(query, products, setFilteredProducts);
  }, [query]);

  useEffect(() => {
    if (isLoggedIn) {
      updateFavoriteList(favorite, user, setFavorite);
    }
  }, [favorite]);

  const handleFavorite = (productId) => {
    setFavorite(productId);
  };

  return filteredProducts ? (
    <div className="container">
      <div>
        <label>Search Product</label>
      </div>
      <input
        name="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="product-container">
        {filteredProducts.map((product) => {
          return (
            <div key={product._id} className="product-card" style={{ border: "1px solid grey" }}>
              <Link to={`/products/${product._id}`}>
                <div className="img-gallery">
                  <img src={product.imageUrl} style={{ height: "200px" }} />
                </div>
                <div>
                  <h2>{product.title}</h2>
                  <h5>€ {product.price}</h5>
                </div>
              </Link>
              <button
                className="heart-btn"
                onClick={() => handleFavorite(product._id)}
              >
                Add to favorites
              </button>
            </div>
          );
        })}
        <hr></hr>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default HomePage;
