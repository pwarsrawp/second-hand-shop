import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postOne, updateOne } from "../functions/api.calls";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

function PurchasePage() {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [sold, setSold] = useState("");
  const [user] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const response = await axios.get(
          `${api_url}/products/${productId}`
        );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneProduct();
  }, [productId]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    
    if (user._id === product.seller) {
      try {
        await 
        
        updateOne(`/products/${product._id}`, { sold: true });
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
          sold: false, // This may depend on your business logic
        });
        navigate("/profile");
      } catch (error) {
        console.error("Error creating purchase:", error);
      }

    }
  };



console.log(product)
  return product === null ? (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
    ) : (

    <div className="signup-form">
      <Navbar />
      <h2>Product Purchase Page</h2>
      <form onSubmit={handlePurchase}>
        <h3>{product.title}</h3>
        <p>{product.price}</p>   
        <p>{product.seller}</p>     {/*this is an ObjectId!*/}

      
        {user._id === product.seller ? (
          <button type="submit">Confirm Sell</button>
          ) : (
          <button type="submit">Confirm Purchase</button>
        )}
      </form>
    </div>
  );
}

export default PurchasePage;