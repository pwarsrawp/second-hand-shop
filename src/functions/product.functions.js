import axios from "axios";
import { useContext } from "react";


const fetchAll = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data;
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



const updateFavoriteList = async (productId, setter, user) => {

    try {
        const { data } = await axios.get(`http://localhost:5005/users/${user}`)
        let favArray = data.favorites

        
        if (favArray.includes(productId)) {     // already favorite -> delete
            const copyArr = [...favArray]
            favArray = copyArr.filter((product) => {
                return product !== productId
            })
        } else {                                // not yet favorite -> add
            favArray = [...favArray, productId]
        }

        // update user's db-entry
        await axios.put(`http://localhost:5005/users/${user}`, { favorites: favArray });
        setter(favArray)
    } catch (error) {
        console.log(error);
    }
};



export {
    fetchAll,
    filterProducts,
    updateFavoriteList
}