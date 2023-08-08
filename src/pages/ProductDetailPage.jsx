import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../utils/usersAPICalls";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;
