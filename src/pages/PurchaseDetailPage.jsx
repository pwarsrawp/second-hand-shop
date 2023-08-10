import { Link, useNavigate, useParams } from "react-router-dom";
import { postOne, updateOne } from "../functions/api.calls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar  from "../components/Navbar";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;


function PurchasePage() {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const { user } = useContext(AuthContext);
  const [sold, setSold] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const response = await axios.get( `${api_url}/products/${productId}` );
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneProduct();
  }, [productId]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
      
      // Fetch seller's information using the product's seller ObjectId
      const sellerResponse = await axios.get(`${api_url}/users/${product.seller}`);
      if (user._id === product.seller) {
        setSeller(sellerResponse.data);
        
      } else {
        setBuyer(sellerResponse.data);
       
      }  
      
        console.log("seller",seller)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSeller();
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
        });
        navigate("/profile");
      } catch (error) {
        console.error("Error creating purchase:", error);
      }

    }
  };



console.log(product)
console.log(buyer)
console.log(seller)
  return product === null ? (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
    ) : (

    <div className="signup-form">
      <Navbar />
      <h2>Purchase Page</h2>
      <img src={product.imageUrl} alt={product.name} />
      <form onSubmit={handlePurchase}>
        <h3>{product.title}</h3>
        <p>€ {product.price}</p>   
       

      
        {user._id === product.seller ? (
          <>
            <p>Buyer: {user.fullname}</p>
            <button type="submit">Confirm Purchase</button>
           
          </>
          ) : (
            <>  
            <p>Seller: {user.fullname}</p>
            <button type="submit">Confirm Sell</button>
           
          </>
        )}
      </form>
    </div>
  );
}

export default PurchasePage;