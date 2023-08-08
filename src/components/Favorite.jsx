import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { fetchAll } from "../functions/api.calls";
import { updateFavoriteList } from "../functions/product.functions";
const api_url = import.meta.env.VITE_API_URL;

function Favorite() {
  const { user, setUserUpdate, isLoggedIn } = useContext(AuthContext);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  /* ALL PRODUCTS */
  useEffect(() => {
    const fetchAllProducts = async() =>{
      try {
        const products = await fetchAll(`${api_url}/products`)
        setAllProducts(products)
      } catch (error) {
        console.log("couldnt fetch products: ", error)
      }
    } 
    fetchAllProducts()
  }, [favoriteProductIds]);


 /* FAVORITES */  
  useEffect(() => {
    if (user) setFavoriteProductIds(user.favorites)
  }, []);

  const handleFavorite = async (productId) => {
    if (isLoggedIn) {
      try {
        const newFavorites = await updateFavoriteList(productId, user);
        setUserUpdate(true)
        setFavoriteProductIds(newFavorites)
      } catch (error) {
        console.log("updating favorites didnt work", error);
      }
    }
  };


  return allProducts ? (
    <>
      <h2>Your Wishlist</h2>
      <div className="product-container">
        {allProducts
        .filter(product => favoriteProductIds.includes(product._id)) 
        .map((product) => {
          return (
            <div key={product._id}>
              <h3>{product.title}</h3>
              <h3>{product.price}</h3>
              <p>{product.description}</p>
              <img
                src={product.imageUrl}
                alt={product.title}
              />
              <div>
              <button
                className={`heart-btn active`}
                onClick={() => handleFavorite(product._id)}
                >
                  Favorite
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Favorite;
