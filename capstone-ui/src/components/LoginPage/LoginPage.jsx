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
  setUserLoggedIn,
  userType,
  setUserType,
}) {
  const navigate = useNavigate();

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

  function handleChangeUserType(event) {
    setUserType(event.target.value);
  }

  function handleDemo(event) {
    event.preventDefault();
    setUserLoginInfo({
      email: "nylevenya@hotmail.com",
      password: "2003nyleve",
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    let result = await axios.post(
      "http://localhost:3010/auth/login" + `/${userType}`,
      {
        email: userLoginInfo.email,
        password: userLoginInfo.password,
      }
    );
      console.log("result from login: ", result.data)
    if (result?.data) {
      localStorage.setItem("token", result.data.token);
      // const decodedToken = jwtDecode(token);
      // setUserData(decodedToken)

      {
        userType == "student"
          ? setUserLoginInfo(result.data.student)
          : userType == "parent"
          ? setUserLoginInfo(result.data)
          : userType == "college-admission-officer" ? setUserLoginInfo(result.data.admissionOfficer) :
          userType == "college-students-and-alumni"
          ? setUserLoginInfo(result.data)
          : null;
      }

      setError({});
      setUserLoggedIn(true);
      {
        userType == "student"
          ? navigate("/feed")
          : userType == "parent"
          ? navigate("/child-feed")
          : userType == "college-admission-officer"
          ? navigate("/events")
          : userType == "college-students-and-alumni"
          ? navigate("/mycollege")
          : null;
      }
    } else {
      setError(result?.data);
    }
  }

  return (
    <div className="login-page">
      <h1 className="user-type-prompt">
        Which of the following best describes you?
      </h1>
      <div className="user-types">
        <button
          className="student"
          value="student"
          onClick={handleChangeUserType}
        >
          Student
        </button>

        <button
          className="parent"
          value="parent"
          onClick={handleChangeUserType}
        >
          Parent/Guardian of Student
        </button>

        <button
          className="college-admission-officer"
          value="college-admission-officer"
          onClick={handleChangeUserType}
        >
          College Admission Officer
        </button>
        <button
          className="college-students-and-alumni"
          value="college-students-and-alumni"
          onClick={handleChangeUserType}
        >
          College Student/Alum
        </button>
      </div>

      {userType ? (
        <>
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
                value={userLoginInfo?.email}
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
                value={userLoginInfo?.password}
                onChange={(e) =>
                  setUserLoginInfo((u) => ({ ...u, password: e.target.value }))
                }
              ></input>
              <button
                className="password-toggle"
                name="password-toggle"
                onClick={
                  passwordDisplayed.password
                    ? handleHidePassword
                    : handleShowPassword
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
          </button>
          <div>
            Don't have an account?
            <button className="register-button">
              <Link to={"/register"}> Register </Link>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
