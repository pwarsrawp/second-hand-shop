import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
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

  return product === null ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <p>{product.price}</p>
      <p>{product.item_condition}</p>
      <p>{product.state}</p>
      <p>{product.seller}</p>
    </div>
  );
};

export default ProductDetailPage;
