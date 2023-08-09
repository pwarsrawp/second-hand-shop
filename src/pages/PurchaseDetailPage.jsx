import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../utils/usersAPICalls";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchOne,postOne } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;

function PurchasePage() {
  const [product, setProducts] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [sold, setSold] = useState("");

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
    try {
      await postOne(`${api_url}/purchase`, {
        seller,
        buyer,
        product,
        sold,
        
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="signup-form">
      <Navbar />
      <h2>Product Purchase Page</h2>
      <form onSubmit={handlePurchase}></form>
      <h3>{product.title}</h3>
      <p>{product.price}</p>   
      <p>{product.seller}</p>     {/*this is an ObjectId!*/}

        
      <button type="submit">Signup</button>  
    </div>
  );
}

export default PurchasePage;