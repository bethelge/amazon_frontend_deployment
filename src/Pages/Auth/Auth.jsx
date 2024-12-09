import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);

          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signup: false });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };
  // console.log(password,email)
  return (
    <section className={classes.login}>
      {/* logo */}
      {/* form */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state.message && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.message}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {loading.signin ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
          {error && (
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          )}
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please our Privacy Notice, our Cookies Notice and our
          Intrest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signup ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
