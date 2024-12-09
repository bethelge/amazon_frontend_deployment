import React, {useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from "./Product.module.css"

function Product() {
    const[product, setProduct] = useState([])
    const[isLoading, setisLoading] = useState()
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((res)=> {
            setProduct(res.data)
            isLoading(false)
        }).catch((err)=> {
            console.log(err)
            isLoading(false)
        })
      
    
    }, [])
    
  return (
    <>
    {
        isLoading?(<Loader/>): (   <section className= {classes.product__container}>

            {
            product.map((singleProduct) => (
                <ProductCard 
                renderAdd={true}
                
                product={singleProduct} key ={singleProduct.id}/>
            ))
            }
            </section>)
    }
    
    </>
 
  )
}

export default Product