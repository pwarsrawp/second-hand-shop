import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { fetchAllProducts, filterProducts, addToFavorites } from '../functions/product.functions';


function HomePage() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const api_url = `http://localhost:5005/products`;

  useEffect(() => {
    fetchAllProducts(api_url, setProducts)
    fetchAllProducts(api_url, setFilteredProducts)
  }, [])

  useEffect(() => {
    filterProducts(query, products, setFilteredProducts);
    console.log(filteredProducts)
  }, [query]);

  return filteredProducts ? (
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
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="product-card">
                <div className='img-gallery'>
                  <img src={product.imageUrl} style={{height:"200px"}} />
                </div>
                <div>
                  <h2>{product.title}</h2>
                  <h5>€ {product.price}</h5>
                  <button className="heart-btn" onClick={addToFavorites}></button>
                </div>
              </div>
            </Link>
          );
        })}
        <hr></hr>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default HomePage