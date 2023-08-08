import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  filterProducts,
  updateFavoriteList,
} from "../functions/product.functions";
import { fetchAll } from "../functions/api.calls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiOutlineHeart } from "react-icons/ai";
const api_url = import.meta.env.VITE_API_URL;

function HomePage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const linkStyle = { textDecoration: "none", color: "black" };
  const { isLoggedIn, user, setUserUpdate } = useContext(AuthContext);

  /* SETUP */
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await fetchAll(`${api_url}/products`);
      setProducts(productsData);
      setFilteredProducts(productsData);
    };
    fetchProducts();
  }, []);

  /* SEARCH BAR */
  useEffect(() => {
    filterProducts(query, products, setFilteredProducts);
  }, [query]);

  /* FAVORITES */
  useEffect(() => {
    if (user) {
      setFavorite(user.favorites);
    }
  }, [user]);

  const handleFavorite = async (productId) => {
    if (isLoggedIn) {
      try {
        const newFavorites = await updateFavoriteList(productId, user);
        setUserUpdate(true);
        setFavorite(newFavorites);
      } catch (error) {
        console.log("updating favorites didn work", error);
      }
    }
  };

  return filteredProducts ? (
    <>
      <Navbar />
      <div className="body-container">
        <div className="search-bar-container">
          <label>Search Product</label>
            <input
              name="query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />          
        </div>
        <div className="products-container">
          {filteredProducts.map((product) => {
            return (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="product-card"
                style={linkStyle}
              >
                <div
                  className="product-card-img-container"
                  style={{ backgroundImage: `url(${product.imageUrl})` }}
                ></div>
                <div className="product-card-price-container">
                  <h5>€ {product.price}</h5>
                  <button
                    className={`heart-btn ${
                      favorite.includes(product._id) ? "active" : "not-active"
                    }`}
                    onClick={() => handleFavorite(product._id)}
                  >
                    <AiOutlineHeart size={20} style={{ color: "#6BBAEC" }} />
                  </button>
                </div>
                <div className="product-card-title-container">
                  <h2>{product.title}</h2>
                </div>
              </Link>
            );
          })}
          <hr></hr>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Navbar />
      <h1 className="loading-h1">Loading...</h1>
    </>
  );
}

export default HomePage;
