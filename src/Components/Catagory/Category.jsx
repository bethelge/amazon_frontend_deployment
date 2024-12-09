import React from "react";
import { CategoryImage } from "./CategoryInfo"; 
import CategoryCard from "./CategoryCard"; 
import classes from "./category.module.css";

const Category = () => {
  return (
    <div className={classes.category__container}>
      {CategoryImage.map((category) => (
        <CategoryCard key={category.name} data={category} />
      ))}
    </div>
  );
};

export default Category;
