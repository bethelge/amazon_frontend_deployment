import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Handle card input errors
  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    if (processing) return; // Prevent multiple submissions

    try {
      setProcessing(true);
      setCardError(null);

      // Step 1: Get client secret from the server
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );

      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to retrieve client secret from server.");
      }

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: user.email,
              name: user.displayName,
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      // Step 3: Save payment info to Firestore
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empty the basket
      dispatch({ type: Type.EMPTY_BASKET});

      // console.log("Payment successful:", paymentIntent);
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order!" } });
    } catch (error) {
      console.error("Payment failed:", error.message);
      setCardError(error.message);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.Payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment Section */}
      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>Chicago, IL</div>
        </div>
        <hr />

        {/* Review Items */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Method */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Display Card Errors */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* Card Input */}
                <CardElement onChange={handleChange} />

                {/* Total Price */}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      <p style={{ display: "flex", gap: "10px" }}>
                        Total Order | <CurrencyFormat amount={total} />
                      </p>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
