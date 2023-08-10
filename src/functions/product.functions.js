const api_url = import.meta.env.VITE_API_URL;
import { fetchOne, updateOne } from "../functions/api.calls";

const filterProducts = (query, products, setter) => {
    if (!query) return setter(products);

    const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase())
    })
    setter(filtered)
}



const updateFavoriteList = async (productId, user) => {
    try {
        const userResponse = await fetchOne(`${api_url}/users/${user._id}`);
        const userData = userResponse;

        const favArray = userData.favorites || []

        const newFavArray = favArray.includes(productId)
            ? userData.favorites.filter((product) => product !== productId)   // delete from Favorites
            : [...userData.favorites, productId];   // add to Favorites


        // update DB
        await updateOne(`${api_url}/users/${user._id}`, { favorites: newFavArray });

        return newFavArray
    } catch (error) {
        console.log("Issue updating favorite list: ", error);
    }
};



export {
    filterProducts,
    updateFavoriteList
}