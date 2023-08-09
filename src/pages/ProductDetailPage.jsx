import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/products/${productId}`
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
