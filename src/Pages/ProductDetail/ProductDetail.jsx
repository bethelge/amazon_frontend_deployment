import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); 
  const[isLoading, setisLoading] = useState(false)

  useEffect(() => {
  setisLoading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data); 
        setisLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch product details."); 
        console.log(err);
        setisLoading(false)
      });
  }, [productId]); 
  if (error) {
    return <div>{error}</div>; 
  }

  if (!product) {
    return <div><Loader/></div>; 
  }

  return (
    <LayOut>
      {isLoading? (<Loader />): (<ProductCard product={product}
      flex={true} 
      renderDesc ={true}
      renderAdd={true}
      
      />)}
      
    </LayOut>
  );
}

export default ProductDetail;

