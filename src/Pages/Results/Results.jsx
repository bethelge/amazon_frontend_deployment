import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  const categoryMap = {
    fashion: "women's clothing",
    electronics1: "electronics",
    jewelry: "jewelery",
    "mens-clothing": "men's clothing",
    "womens-clothing": "women's clothing",
  };

  const mappedCategory = categoryMap[categoryName];

  useEffect(() => {
    if (!mappedCategory) {
      setError(`Invalid category: ${categoryName}`);
      setLoading(false);
      return;
    }

    console.log("Mapped Category:", mappedCategory);
    setLoading(true);

    axios
      .get(`${productUrl}/products/category/${mappedCategory}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setResults(res.data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, [mappedCategory]);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />

      
       { isLoading ? (
        <Loader/>
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} 
              renderDesc={false}
              renderAdd={true}
              
              
              
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
