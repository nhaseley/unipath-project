import * as React from "react";
import { useEffect, useState } from "react";
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function RegistrationPage({
  userLoginInfo,
  setUserLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
  setError,
}) {
  console.log("registration info: ", userLoginInfo);
  async function handleRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      console.log("registering...")
      let result = await axios.post("http://localhost:3002/auth/register", {
        emailInput: userLoginInfo.email,
        passwordInput: userLoginInfo.password,
        firstNameInput: userLoginInfo.firstName,
        lastNameInput: userLoginInfo.lastName,
        parentPhoneInput: userLoginInfo.parentPhone,
        zipcodeInput: userLoginInfo.zipcode,
      });
      console.log("result on frontend: ", result);

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
              setUserLoginInfo((u) => ({ ...u, email: e.target.value }))
            }
          ></input>
        </div>
        <div className="names">
          <div className="first-name">
            <input
              className="first-name-input"
              type="text"
              placeholder="First Name"
              value={userLoginInfo.firstName}
              onChange={(e) =>
                setUserLoginInfo((u) => ({
                  ...u,
                  firstNameInput: e.target.value,
                }))
              }
            ></input>
          </div>

          <div className="last-name">
            <input
              className="last-name-input"
              type="text"
              placeholder="Last Name"
              value={userLoginInfo.lastName}
              onChange={(e) =>
                setUserLoginInfo((u) => ({
                  ...u,
                  lastNameInput: e.target.value,
                }))
              }
            ></input>
          </div>
        </div>
        <div className="parent-phone">
          <input
            className="parent-phone-input"
            type="text"
            placeholder="Phone Number"
            value={userLoginInfo.parentPhone}
            onChange={(e) =>
              setUserLoginInfo((u) => ({
                ...u,
                parentPhoneInput: e.target.value,
              }))
            }
          ></input>
        </div>
        <div className="zipcode">
          <input
            className="zipcode-input"
            type="text"
            placeholder="Zipcode"
            value={userLoginInfo.zipcode}
            onChange={(e) =>
              setUserLoginInfo((u) => ({ ...u, zipcodeInput: e.target.value }))
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
            name="password-toggle"
            className="password-toggle"
            type="button"
            onClick={
              passwordDisplayed.password
                ? handleHidePassword
                : handleShowPassword
            }
          >
            {passwordDisplayed.password ? "Hide" : "Show"}
          </button>
        </div>
        <div className="confirm-password">
          <img
            src="https://www.pngitem.com/pimgs/m/140-1407340_lock-icon-clipart-png-download-white-login-password.png"
            className="password-img"
          ></img>

          <input
            name="confirm-password"
            type={passwordDisplayed.confirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="confirm-password-input"
            value={userLoginInfo.confirmPassword}
            onChange={(e) =>
              setUserLoginInfo((u) => ({
                ...u,
                confirmPassword: e.target.value,
              }))
            }
          ></input>
          <button
            name="confirm-password-toggle"
            type="button"
            className="confirm-password-toggle"
            onClick={
              passwordDisplayed.confirmPassword
                ? handleHidePassword
                : handleShowPassword
            }
          >
            {passwordDisplayed.confirmPassword ? "Hide" : "Show"}
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
        </div>
      </form>
      <button className="registration-submit" onClick={handleRegistration}>
        Submit
        {/* <Link to={"/login"}> Submit</Link> */}
      </button>
      <div>
        Already have an account?
        <button className="login-button">
          {/* <Link to={"/login"}> Login </Link> */}
        </button>
      </div>
    </div>
  );
}
