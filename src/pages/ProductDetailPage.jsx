import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/auth.context";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PiHeart } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { updateFavoriteList } from "../functions/product.functions";
import { postOne, updateOne } from "../functions/api.calls";

const api_url = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [newPurchaseId, setNewPurchaseId] = useState(null);
  const { productId } = useParams();
  const { user, setUserUpdate, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

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
      if (product) {
        try {
          const fetchedSeller = await axios.get(
            `${api_url}/users/${product.seller}`
          );
          setSeller(fetchedSeller.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getSeller();
  }, [product]);

  const handleFavorite = async (productId) => {
    try {
      const newFavorites = await updateFavoriteList(productId, user);
      setUserUpdate(true);
    } catch (error) {
      console.log("Issue updating favorites: ", error);
    }
  };

  const handlePurchaseRequest = async () => {
    /* Check Product Availability */
    if(!isLoggedIn){
      navigate("/login")
    }

    if( seller && user && product && product.state === "available"){
      try {
        /* Create new Purchase Request */
        const {data} = await postOne( `${api_url}/purchases`, { seller: seller._id, buyer: user._id, product: product._id, state: "pending"})
        setNewPurchaseId(data._id)

        /* Product State Update */
        await updateOne( `${api_url}/products/${product._id}`, {state: "reserved"})

        if(newPurchaseId){
          navigate(`/purchases/${data._id}/${product._id}`)
        }
     
      } catch (error) {
        console.log("Error updating purchase/product data: ", error)
      }
    }
    
    /* User Feedback */
    if(product.state){
      navigate(`/products/${product._id}/${product.state}`)
    }
}


  return !product || !seller ? (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bare with me...</h1>
        <Spinner />
      </div>
    </>
  ) : (
    <div className="product-details-wrapper">
      <Navbar />
      <div className="product-details-container">
        <div className="product-details-image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-details-price-favorite-line">
          <h2 className="product-details-price">{product.price} EUR</h2>
          {user ? (
            user.favorites.includes(productId) ? (
              <button onClick={() => handleFavorite(product._id)}>
                <PiHeartFill size={45} style={{ color: "#E27688" }} />
              </button>
            ) : (
              <button onClick={() => handleFavorite(product._id)}>
                <PiHeart size={45} style={{ color: "#E27688" }} />
              </button>
            )
          ) : (
            <Link to={"/login"}>
              <PiHeart size={45} style={{ color: "#E27688" }} />
            </Link>
          )}
        </div>
        <h2 className="product-details-title">{product.title}</h2>
        <h2 className="product-details-item-condition">
          {product.item_condition}
        </h2>
        <h2 className="product-details-category">{product.category}</h2>
        <hr className="product-details-divider" />
        <p className="product-details-description">{product.description}</p>
        <div className="product-details-bottom-container">
          <div className="product-details-bottom-container-left">
              <button onClick={() => handlePurchaseRequest()}>Buy</button>

            <button>Chat</button>
          </div>
          <div className="product-details-bottom-container-right">
            <h2>{seller.fullname}</h2>
            <h3>
              {seller.address.city} <span>({seller.address.country})</span>
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
