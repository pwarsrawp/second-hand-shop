import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAll,
  filterProducts,
  updateFavoriteList,
} from "../functions/product.functions";
import { AuthContext } from "../context/auth.context";
import "./HomePage.css";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

  const api_url = `http://localhost:5005`;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await fetchAll(`${api_url}/products`);
      setProducts(productsData);
      setFilteredProducts(productsData);
    };

    const fetchFavorites = async () => {
      if (user) {
        const userData = await fetchAll(`${api_url}/users/${user._id}`);
        if (userData) {
          setFavorite(userData.favorites || []);
        }
      }
    };

    fetchFavorites();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(query, products, setFilteredProducts);
  }, [query]);

  const handleFavorite = async (productId) => {
    if (isLoggedIn) {
      try {
        await updateFavoriteList(productId, setFavorite, user._id);
      } catch (error) {
        console.log("updating favorites didnt work");
      }
    }
  };

  return filteredProducts ? (
    <>

    <Navbar />
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
            <div
              key={product._id}
              className="product-card"
              style={{ border: "1px solid grey" }}
            >
                <div className="img-gallery">
                  <img src={product.imageUrl} style={{ height: "200px" }} />
                </div>
                <div>
              <Link to={`/products/${product._id}`}>
                  <h2>{product.title}</h2>
              </Link>
                  <h5>€ {product.price}</h5>
                </div>
              <button
                className={`heart-btn ${favorite.includes(product._id) ? "active" : "not-active"}`}
                onClick={() => handleFavorite(product._id)}
                >
                  Favorite
                </button>
              </div>
            );
          })}
          <hr></hr>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default HomePage;
