import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { useParams, Link } from "react-router-dom";
import { PiHandshakeFill } from "react-icons/pi";
const api_url = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const response = await axios.get(`${api_url}/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneProduct();
  }, [productId]);

  useEffect(() => {
    const getSeller = async () => {
      if(product){
        try {
          const fetchedSeller = await axios.get(`${api_url}/users/${product.seller}`);
          setSeller(fetchedSeller.data);
        } catch (error) {
          console.log(error);
        }
      }      
    };
    getSeller();
  }, [product]);

  return !product || !seller ? (
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
        <h2 className="product-details-price">{product.price} EUR</h2>
        <h2 className="product-details-title">{product.title}</h2>
        <h2 className="product-details-item-condition">
          {product.item_condition}
        </h2>
        <h2 className="product-details-category">{product.category}</h2>
        <hr className="product-details-divider" />
        <p className="product-details-description">{product.description}</p>
        {/* <p>{product.state}</p>
        <p>{product.seller}</p> */}
        <div className="product-details-bottom-container">
          <div className="product-details-bottom-container-left">
            <button>Buy</button>
            <button>Chat</button>
          </div>
          <div className="product-details-bottom-container-right">
            <h2>{seller.fullname}</h2>
            <h3>
              {seller.address.city} <span>({seller.address.country})</span>
            </h3>
          </div>
        </div>
        <Link to={`/purchase/${productId}`}>
          <PiHandshakeFill size={30} style={{ color: "#1778b5" }} />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
