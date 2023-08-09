import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../utils/usersAPICalls";
import Navbar from "../components/Navbar";
import { fetchOne, postOne, updateOne } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;

function PurchasePage() {
  const [product, setProducts] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [sold, setSold] = useState("");
  const [user] = useState("");

  const navigate = useNavigate();

  /* PRODUCT SETUP */
  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await fetchOne(`${api_url}/purchase`);
      setProducts(productsData);
      setFilteredProducts(productsData);
    };
    fetchProducts();
  }, []);

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
          sold: false, // This may depend on your business logic
        });
        navigate("/profile");
      } catch (error) {
        console.error("Error creating purchase:", error);
      }

    }
  };




  return (
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