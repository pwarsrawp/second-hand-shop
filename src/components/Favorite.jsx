import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { fetchAll } from "../functions/api.calls";
import { updateFavoriteList } from "../functions/product.functions";
import { PiHeartFill } from "react-icons/pi";
const api_url = import.meta.env.VITE_API_URL;

function Favorite() {
  const { user, setUserUpdate, isLoggedIn } = useContext(AuthContext);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  /* ALL PRODUCTS */
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await fetchAll(`${api_url}/products`);
        setAllProducts(products);
      } catch (error) {
        console.log("Issue fetching products: ", error);
      }
    };
    fetchAllProducts();
  }, [favoriteProductIds]);

  /* FAVORITES */
  useEffect(() => {
    if (user) setFavoriteProductIds(user.favorites);
  }, []);

  const handleFavorite = async (productId) => {
    if (isLoggedIn) {
      try {
        const newFavorites = await updateFavoriteList(productId, user);
        setUserUpdate(true);
        setFavoriteProductIds(newFavorites);
      } catch (error) {
        console.log("Issue updating favorites: ", error);
      }
    }
  };

  return allProducts ? (
    <>
      <h1 className="favorites-container-title">Wishlist</h1>
      <div className="favorites-container">
        {allProducts
          .filter((product) => favoriteProductIds.includes(product._id))
          .map((product) => {
            return (
              <div key={product._id} className="favorite-product-container">
                <div className="favorite-product-image-container">
                  <img src={product.imageUrl} alt={product.title} />
                </div>
                <div className="favorite-product-price">
                  <h2>{product.price} €</h2>
                  <button onClick={() => handleFavorite(product._id)}>
                    <PiHeartFill size={25} style={{ color: "#E27688" }} />
                  </button>
                </div>
                <h3>{product.title}</h3>
              </div>
            );
          })}
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bare with me...</h1>
        <Spinner />
      </div>
    </>
  );
}

export default Favorite;
