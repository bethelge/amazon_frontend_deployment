import React from "react";
import classes from "./category.module.css";
import {Link} from 'react-router-dom'

function CategoryCard({ data }) {
  
  console.log("Received data in CategoryCard:", data);

  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2 className={classes.categoryTitle}>{data.title}</h2>
        </span>
        <img
          src={data.imgLink}
          alt={data.title}
          className={classes.categoryImage}
        />
        <p className={classes.shopNow}>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
