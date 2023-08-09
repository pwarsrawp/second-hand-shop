import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
const api_url = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const response = await axios.get(`${api_url}/products/${productId}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneProduct();
  }, [productId]);

  return product === null ? (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bare with me...</h1>
        <Spinner />
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div className="product-details-container">
        <div className="product-details-image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-details-first-line">
          <h2>{product.price} €</h2>
          <p>({product.category})</p>
        </div>
        <div className="product-details-second-line">
          <h2>{product.title}</h2>
        </div>
        <div className="product-details-third-line">
          <p>{product.description}</p>
        </div>
        <div className="product-details-fourth-line">
          <p><span>Condition: </span>{product.item_condition}</p>
        </div>
        {/* <p>{product.state}</p>
        <p>{product.seller}</p> */}
        <div className="product-details-button-container">
          <button>Buy</button>
          <button>Chat</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
