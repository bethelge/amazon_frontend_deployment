import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signup from "./Pages/Auth/Auth";
import Payment from "./Pages/Payments/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51QSlY606AsRdWM3wmUMOCEnkzlz3uALPrZndwI4OUJDbonfJDuZcfZgiQZ0ihhtVyPpBEeZuOs5mGOE9hNMAtHbz00qtvLkfSw"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Signup />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              message={"you must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/orders" element={
           <ProtectedRoute
           message={"you must login to access your orders"}
           redirect={"/orders"}
         >
          
          <Orders />

          </ProtectedRoute>}/>
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
