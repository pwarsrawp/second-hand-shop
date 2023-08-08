import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { filterProducts, updateFavoriteList } from "../functions/product.functions";
import { fetchAll } from "../functions/api.calls";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const api_url = import.meta.env.VITE_API_URL;

function HomePage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const { isLoggedIn, user, setUserUpdate } = useContext(AuthContext);

  /* SETUP */
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await fetchAll(`${api_url}/products`)
      setProducts(productsData)
      setFilteredProducts(productsData)
    }    
    fetchProducts()
  }, [])


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
        setUserUpdate(true)
        setFavorite(newFavorites)
      } catch (error) {
        console.log("updating favorites didn work", error);
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
