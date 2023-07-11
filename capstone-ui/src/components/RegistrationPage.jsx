import * as React from "react";
import { useEffect, useState } from "react";
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

async function handleRegistration(event) {
  event.preventDefault();

  if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
    setError({ message: "Passwords do not match", status: 422 });
  } else {
    let result = await axios.post("http://localhost:3001/auth/register", {
      emailInput: userLoginInfo.email,
      passwordInput: userLoginInfo.password,
      firstNameInput: userLoginInfo.firstName,
      lastNameInput: userLoginInfo.lastName,
      parentPhoneInput: userLoginInfo.parentPhone,
      zipcodeInput: userLoginInfo.zipcode,
    });

    if (result.data.status) {
      setError(result.data);
    } else {
      //   const token = result.data.token;
      //   localStorage.setItem("token", token);
      //   const decodedToken = jwtDecode(token);
      setError({});
      setUserLoginInfo({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
    }
  }
}

export default function RegistrationPage() {
  return (
    <div className="registration-page">
      <h2> Create an account </h2>

      <form className="registration-form">
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
              setUserLoginInfo((u) => ({ ...u, email: e.target.value }))}
          ></input>
        </div>
        <div
          className="first-name"
          type="text"
          placeholder="First Name"
          value={userLoginInfo.firstName}
          onChange={(e) =>
            setUserLoginInfo((u) => ({ ...u, firstNameInput: e.target.value }))}
        ></div>

        <div
          className="last-name"
          type="text"
          placeholder="Last Name"
          value={userLoginInfo.lastName}
          onChange={(e) =>
            setUserLoginInfo((u) => ({ ...u, lastNameInput: e.target.value }))}
        ></div>
        <div
          className="parent-phone"
          type="text"
          placeholder="Phone Number"
          value={userLoginInfo.parentPhone}
          onChange={(e) =>
            setUserLoginInfo((u) => ({
              ...u,
              parentPhoneInput: e.target.value }))
          }
        ></div>
        <div
          className="zipcode"
          onChange={(e) =>
            setUserLoginInfo((u) => ({ ...u, zipcodeInput: e.target.value }))}
        ></div>
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
      </form>
      <button className="login-submit" onClick={handleLogin}>
        Submit
        {/* <Link to={"/generate-colleges"}> Submit</Link> */}
      </button>
      <div>
        Don't have an account?
        <button className="register-button">
          {/* <Link to={"/register"}> Register </Link> */}
        </button>
      </div>
    </div>
  );
}
