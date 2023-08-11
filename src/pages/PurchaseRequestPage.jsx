import { useContext } from "react";
import Reserved from "../components/Reserved";
import Sold from "../components/Sold";
import Requested from "../components/Requested";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function PurchaseRequestPage() {
  const { productId, productState } = useParams();
  return productState === "reserved" ? (
    <Reserved productId={productId} />
  ) : productState === "sold" ? (
    <Sold />
  ) : productState === "available" ? (
    <Requested />
  ) : (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bare with me...</h1>
        <Spinner />
      </div>
    </>
  );
}

export default PurchaseRequestPage;
