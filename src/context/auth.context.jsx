import { useState, useEffect, createContext } from "react";
import axios from "axios";
// import { fetchOne, updateOne } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  /* AUTHENTICATION */
  const userAuthentication = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const { data } = await axios.get(`${api_url}/auth/verify`, {
          headers: { authorization: `Bearer ${token}` },
        });

        // authorization successful
        setUser(data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("authorization failed: ", error);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      // reset states
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  

  // const updateFavoriteList = async (productId) => {

  //   try {
  //     const userResponse = await fetchOne(`${api_url}/users/${user._id}`);
  //     const userData = userResponse;

  //     const favArray = userData.favorites || []


  //     const newFavArray = favArray.includes(productId)
  //     ? userData.favorites.filter((product) => product !== productId)   // delete from Favorites
  //     : [...userData.favorites, productId];   // add to Favorites


  //     // update DB
  //     await updateOne(`${api_url}/users/${user._id}`, {favorites: newFavArray }); 

  //     // update user
  //     setUser({ ...user, favorites: newFavArray });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        userAuthentication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextWrapper };
