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
    if(!query) return setter(products);

    const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase())
    })
    setter(filtered)
    console.log('filtered: ', filtered);
};

const addToFavorites = (id) => {

}
 

export {
    fetchAllProducts,
    fetchQueryProducts,
    addToFavorites
}