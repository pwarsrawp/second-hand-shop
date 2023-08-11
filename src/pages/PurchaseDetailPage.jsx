import { useNavigate, useParams } from "react-router-dom";
import { updateOne } from "../functions/api.calls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      await updateOne(`${api_url}/purchases/${purchaseId}`, {
        state: "completed",
      });
      await updateOne(`${api_url}/products/${productId}`, {
        state: "sold",
        sold: true,
      });
    } catch (error) {
      console.log("Error updating purchase/product data: ", error);
    }
    navigate("/purchases");
  };
  const handleCancel = async () => {
    try {
      await updateOne(`${api_url}/purchases/${purchaseId}`, {
        state: "cancelled",
      });
      await updateOne(`${api_url}/products/${productId}`, {
        state: "available",
        sold: false,
      });
    } catch (error) {
      console.log(
        "Error updating purchase/product data on cancellation: ",
        error
      );
    }
    navigate("/purchases");
  };
  const handleCancelRequest = async () => {
    try {
      await updateOne(`${api_url}/purchases/${purchaseId}`, {
        state: "cancelled",
      });
      await updateOne(`${api_url}/products/${productId}`, {
        state: "available",
        sold: false,
      });
    } catch (error) {
      console.log(
        "Error updating purchase/product data on cancellation: ",
        error
      );
    }
    navigate("/purchases");
  };

  return product && buyer && seller ? (
    user._id === product.seller || user._id === purchase.buyer ? (
      <>
        <Navbar />
        <div className="purchase-details-container">
          <div className="purchase-details-image-container">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <h3 className="purchase-details-price">€ {product.price}</h3>
          <h3 className="purchase-details-title">{product.title}</h3>
          <p className="purchase-details-description">{product.description}</p>

          <p>{product.condition}</p>
          <hr />

          {user._id === product.seller ? (
            <>
              {product.state === "reserved" && (
                <>
                  <p className="purchase-details-buyer">
                    <span>{buyer.fullname}</span> wants to buy this article.
                  </p>

                  <div className="purchase-details-buttons">
                    <button onClick={() => handleConfirmation()}>Accept</button>

                    <button onClick={() => handleCancel()}>Decline</button>
                  </div>
                </>
              )}

              {product.state === "sold" && (
                <>
                  <p className="purchase-details-buyer">
                    <span>{buyer.fullname}</span> bought this article.
                  </p>
                </>
              )}

              {product.state === "cancelled" && (
                <>
                  <p className="purchase-details-buyer">
                    <span>{buyer.fullname}</span> wanted to buy this article.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p>Seller: {seller.fullname}</p>
              <div className="purchase-details-buttons">
                <button onClick={() => handleCancelRequest()}>
                  Cancel Request
                </button>
              </div>
            </>
          )}
        </div>
        <Footer />
      </>
    ) : (
      <ErrorPage />
    )
  ) : (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default PurchasePage;
