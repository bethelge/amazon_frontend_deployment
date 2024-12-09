import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import CarouselBanner from "../../Components/Carousel/Carousel";
import Category from "../../Components/Catagory/Category";
import Product from "../../Components/Product/Product";

function Landing() {
  return (
    <LayOut>
      <CarouselBanner />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
