import { Link, useNavigate, useParams } from "react-router-dom";
import { postOne, updateOne } from "../functions/api.calls";
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
    console.log("purchase: ", purchase);
    const fetchBuyer = async () => {
      if (purchase) {
        console.log(
          "let's get the buyer's data with the buyers id : ",
          purchase.buyer
        );
        try {
          // Fetch buyer information
          const buyerResponse = await axios.get(
            `${api_url}/users/${purchase.buyer}`
            );
            console.log('user._id: ', user._id)
            console.log('product.seller: ', product.seller);
            console.log('product.buyer : ', purchase.buyer );
          setBuyer(buyerResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchBuyer();
  }, [purchase]);

  console.log(buyer);
  const handlePurchase = async (e) => {
    e.preventDefault();

    if (user._id === product.seller) {
      try {
        await updateOne(`/products/${product._id}`, { sold: true });
        navigate("/profile");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Handle buyer action (e.g., create purchase record)
      try {
        await postOne("/purchases", {
          seller: product.seller,
          buyer: user._id,
          product: product._id,
        });
        navigate("/profile");
      } catch (error) {
        console.error("Error creating purchase:", error);
      }
    }
  };
  

  return product && buyer && seller ? (
        user._id === product.seller || user._id === purchase.buyer  ? (
    <div className="signup-form">
      <Navbar />
      <h2>Purchase Page</h2>
      <img src={product.imageUrl} alt={product.name} />
      <form onSubmit={handlePurchase}>
        <h3>{product.title}</h3>
        <p>€ {product.price}</p>

          {user._id === product.seller ? (
            <>
            <p>Buyer: {buyer.fullname}</p>
            <button type="submit">Confirm Purchase</button>
          </>
          ) : (
          <>
            <p>Seller: {seller.fullname}</p>
            <button type="submit">Confirm Sell</button>
          </>
          )}
      </form>
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
