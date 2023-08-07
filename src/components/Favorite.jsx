import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
const api_url = `http://localhost:5005`;

function Favorite() {
  const { user } = useContext(AuthContext);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteIds = async () => {
      try {
        const { data } = await axios.get(`${api_url}/users/${user._id}`);
        setFavoriteProductIds(data.favorites);
      } catch (error) {
        console.error("Error fetching Favorite-IDs:", error);
      }
    };

    fetchFavoriteIds();
  }, []);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const favoriteProducts = await Promise.all(
          // map over all favorite-ids
          favoriteProductIds.map(async (productId) => {
            try {
              const { data } = await axios.get(
                `${api_url}/products/${productId}`
              );
              return data;
            } catch (error) {
              console.log("Error fetching Favorite-Products: ", error);
              return null;
            }
          })
        );
        setFavoriteProducts(favoriteProducts);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavoriteProducts();
  }, [favoriteProductIds]);

  return favoriteProducts ? (
    <>
      <h2>Your Wishlist</h2>
      <div className="product-container">
        {favoriteProducts.map((product) => {
          return (
            <div key={product._id} style={{ border: "1px solid grey" }}>
              <h3>{product.title}</h3>
              <h3>{product.price}</h3>
              <p>{product.description}</p>
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ height: "200px" }}
              />
              <div>
                {/* TODO: Move functions into context. Change button to update favorites-array in db */}
                <button className={"heart-btn active"}>Favorite</button>
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
