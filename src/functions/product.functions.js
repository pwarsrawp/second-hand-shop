import axios from "axios";

const fetchAllProducts = async (url, setter) => {
    try {
        const {data} = await axios.get(url)
        setter(data)
    } catch (error) {
        console.log(error);
    }
};

const fetchQueryProducts = (query, products, setter) => {
    if(!query) return products;

    const queryArray = products.filter((product) => {
        return product.title.includes(query)
    })
    setter(queryArray)
};

const addToFavorites = (id) => {

}
 

export {
    fetchAllProducts,
    fetchQueryProducts,
    addToFavorites
}