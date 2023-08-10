import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteOne, postOne, updateOne } from "../functions/api.calls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const api_url = import.meta.env.VITE_API_URL;

function PurchasePage() {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const { user } = useContext(AuthContext);
  const [sold, setSold] = useState("");

  const navigate = useNavigate();
  const { purchaseId, productId } = useParams();

  // GET product & seller from this purchase
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
    const fetchSeller = async () => {
      if (product) {
        try {
          const sellerResponse = await axios.get(
            `${api_url}/users/${product.seller}`
          );
          setSeller(sellerResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchSeller();
  }, [product]);

  useEffect(() => {
    const fetchPurchase = async () => {
      if (seller && purchaseId) {
        try {
          // Fetch purchase information
          const purchaseResponse = await axios.get(
            `${api_url}/purchases/${purchaseId}`
          );
          setPurchase(purchaseResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchPurchase();
  }, [seller]);

  useEffect(() => {
    const fetchBuyer = async () => {
      if (purchase) {

        try {
          // Fetch buyer information
          const buyerResponse = await axios.get(
            `${api_url}/users/${purchase.buyer}`
            );
          setBuyer(buyerResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchBuyer();
  }, [purchase]);
  

  const handleConfirmation = async () => {
      try {
        await updateOne( `${api_url}/purchases/${purchaseId}`, { state : "completed"})
        await updateOne( `${api_url}/products/${productId}`, { state : "sold", sold : true})
      } catch (error) {
        console.log("Error updating purchase/product data: ", error)
      }
  }
  const handleCancel = async () => {
      try {
        await updateOne( `${api_url}/purchases/${purchaseId}`, { state : "cancelled"})
        await updateOne( `${api_url}/products/${productId}`, { state : "available", sold : false})

        if(window.confirm("Do you want to delete this purchase request?")){
          await deleteOne(`${api_url}/purchases/${purchaseId}`) 
          navigate("/purchase")
        }

      } catch (error) {
        console.log("Error updating purchase/product data on cancellation: ", error)
      }
  }

  return product && buyer && seller ? (
        user._id === product.seller || user._id === purchase.buyer  ? (
    <div className="signup-form">
      <Navbar />
      <h2>Purchase Page</h2>
      <img src={product.imageUrl} alt={product.name} />
        <h3>{product.title}</h3>
        <p>€ {product.price}</p>
        <p>{product.condition}</p>

          {user._id === product.seller ? (
            <>
            <p>Buyer: {buyer.fullname}</p>
            <button onClick={() => handleConfirmation()}>Confirm Purchase</button>
            <button onClick={() => handleCancel()}>Decline Purchase</button>
          </>
          ) : (
          <>
            <p>Seller: {seller.fullname}</p>
          </>
          )}
          <p>{product.description}</p>
    </div>
        ) : (
          <ErrorPage />
  )
  ) : (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  )
}

export default PurchasePage;
