import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { fetchAll } from "../functions/api.calls";
import { sortPurchases } from "../functions/purchase.functions";
import ProductDetailPage from "./ProductDetailPage";
import { Link } from "react-router-dom";

function PurchasePage() {
  const [allPurchases, setAllPurchases] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [completed, setAllCompleted] = useState([]);
  const [pending, setAllPending] = useState([]);
  const [cancelled, setAllCancelled] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const { user } = useContext(AuthContext);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchAll(`${api_url}/products`);
        setAllProducts(productsData);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const purchaseData = await fetchAll(`${api_url}/purchases`);
        setAllPurchases(purchaseData);
      } catch (error) {
        console.log("Error fetching purchases", error);
      }
    };
    fetchPurchases();
  }, []);

  useEffect(() => {
    if (
      allPurchases &&
      allProducts &&
      allPurchases.length > 0 &&
      allProducts.length > 0
    ) {
      setAllCompleted(
        sortPurchases(allPurchases, user, allProducts, "completed")
      );
      setAllPending(sortPurchases(allPurchases, user, allProducts, "pending"));
      setAllCancelled(
        sortPurchases(allPurchases, user, allProducts, "cancelled")
      );
      setAllFetched(true);
    }
  }, [allPurchases, allProducts, user]);

  return allFetched ? (
    <>
      <Navbar />
      <div className="purchases-main-container">
        <h1 className="purchases-title-h1">Sales & Purchases</h1>
        <div className="purchases-container">
          <h2>Completed</h2>
          {completed.length > 0 ? (
            completed.map((purchaseArray, index) => (
              <div key={index}>
                {purchaseArray.map((purchase) => (
                  <div key={purchase._id} className="purchase-card">
                    <Link
                      to={`/purchases/${purchase.purchaseId}/${purchase._id}`}
                    >
                      <h5>{purchase.title}</h5>
                    </Link>
                    <h5>{purchase.price}$</h5>
                    <h5>{purchase.state}</h5>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No pending purchases to show</p>
          )}
        </div>

        <div className="purchases-container">
          <h2>Pending</h2>
          {pending.length > 0 ? (
            pending.map((purchaseArray, index) => (
              <div key={index}>
                {purchaseArray.map((purchase) => (
                  <div key={purchase._id} className="purchase-card">
                    <Link
                      to={`/purchases/${purchase.purchaseId}/${purchase._id}`}
                    >
                      <h5>{purchase.title}</h5>
                    </Link>
                    <h5>{purchase.price}$</h5>
                    <h5>{purchase.state}</h5>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No pending purchases to show</p>
          )}
        </div>

        <div className="purchases-container">
          <h2>Cancelled</h2>
          {cancelled.length > 0 ? (
            cancelled.map((purchaseArray, index) => (
              <div key={index}>
                {purchaseArray.map((purchase) => (
                  <div key={purchase._id} className="purchase-card">
                    <Link
                      to={`/purchases/${purchase.purchaseId}/${purchase._id}`}
                    >
                      <h5>{purchase.title}</h5>
                    </Link>
                    <h5>{purchase.price}$</h5>
                    <h5>{purchase.state}</h5>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No pending purchases to show</p>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bear with me...</h1>
        <Spinner />
      </div>
    </>
  );
}

export default PurchasePage;
