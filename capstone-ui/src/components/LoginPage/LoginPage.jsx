import * as React from "react";
import { useEffect, useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function LoginPage({
  userLoginInfo,
  setUserLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
  setError,
  userLoggedIn,
  setUserLoggedIn
}) {
  // console.log("login info: ", userLoginInfo)

  const navigate = useNavigate()

  //   useEffect(() => {
  //     const checkLoggedIn = () => {
  //     // check if user is already logged in when they first access the webapp
  //     const token = localStorage.getItem("token");
  //     if (token){
  //       const decodedToken = jwtDecode(token);
  //       if (decodedToken.exp * 1000 > Date.now()){
  //         setUserLoggedIn(true)
  //       } else {
  //         // Token has expired, log out the user
  //         logoutUser();
  //       }
  //     }
  // }; checkLoggedIn()
  // }, [])
  function handleDemo(event) {
    event.preventDefault()
    setUserLoginInfo({
      email: "nylevenya@hotmail.com",
      password: "2003nyleve"
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    let result = await axios.post("http://localhost:3010/auth/login", {
      email: userLoginInfo.email,
      password: userLoginInfo.password,
    });

    if (result.data.status) {
      setError(result.data);
    } else {
      // const token = result.data.token;
      // localStorage.setItem("token", token);
      // const decodedToken = jwtDecode(token);
      // setUserData(decodedToken)
      // // used for nutritions page

      setUserLoginInfo({ email: "", password: "" });
      setError({});
      setUserLoggedIn(true);
      navigate("/");
    }
  }
console.log(userLoggedIn)
  return (
    <div className="login-page">
      <h2> Welcome Back! </h2>
      <form className="login-form">
        <div className="email">
          <img
            src="https://www.transparentpng.com/download/send-email-button/DyZNCL-send-email-button-free-download-transparent.png"
            className="email-img"
          ></img>
          <input
            className="email-input"
            type="email"
            placeholder="Email"
            value={userLoginInfo.email}
            onChange={(e) =>
              setUserLoginInfo((u) => ({ ...u, email: e.target.value }))
            }
          ></input>
        </div>
        <div className="password">
        <img
          src="https://www.pngitem.com/pimgs/m/140-1407340_lock-icon-clipart-png-download-white-login-password.png"
          className="password-img"
        ></img>
        <input
          className="password-input"
          type={passwordDisplayed.password ? "text" : "password"}
          placeholder="Password"
          value={userLoginInfo.password}
          onChange={(e) =>
            setUserLoginInfo((u) => ({ ...u, password: e.target.value }))
          }
        ></input>
        <button
          className="password-toggle"
          name="password-toggle"
          onClick={
            passwordDisplayed.password ? handleHidePassword : handleShowPassword
          }
        >
          {passwordDisplayed.password ? "Hide" : "Show"}
        </button>
        </div>
        <button className="demo-button" onClick={handleDemo}>
        Demo Login
      </button>

        <div className="error">
          {error.status
            ? "Registration Failed: " +
              error.message +
              ". " +
              error.status +
              " Error."
            : null}
        </div>
        
      </form>
      <button className="login-submit" onClick={handleLogin}>
        Submit
        {/* <Link to={"/generate-colleges"}> Submit</Link> */}
      </button>
      <div>
        Don't have an account?
        <button className="register-button">
          <Link to={"/register"}> Register </Link>
        </button>
      </div>
    </div>
  );
}
