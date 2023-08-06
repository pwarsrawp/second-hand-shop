import axios from "axios";
import { useContext } from "react";


const fetchAllProducts = async (url, setter) => {
    try {
        const { data } = await axios.get(url)
        setter(data)
    } catch (error) {
        console.log(error);
    }
};

const filterProducts = (query, products, setter) => {
    if (!query) return setter(products);

    const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase())
    })
    setter(filtered)
}



const updateFavoriteList = async (favorite, user) => {
    try {
        const { data } = await axios.get(`http://localhost:5005/users/${user._id}`)

        if (!data.favorites) {
            await axios.put(`http://localhost:5005/users/${user._id}`, { favorites: [favorite] });
        } else if (!data.favorites.includes(favorite)) {
            const newFavorites = [...new Set([...data.favorites, favorite])];
            await axios.put(`http://localhost:5005/users/${user._id}`, { favorites: newFavorites });
        } else {
            console.log("already a favorite");
        }
    } catch (error) {
        console.log(error);
    }
};



export {
    fetchAllProducts,
    filterProducts,
    updateFavoriteList
}