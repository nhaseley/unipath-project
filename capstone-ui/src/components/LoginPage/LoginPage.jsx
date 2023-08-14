import * as React from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  function handleChangeUserType(event) {
    setUserType(event.target.value);
  }

  const handleEmailInputChange = (e) => {
    setError({});
    setUserLoginInfo((u) => ({ ...u, email: e.target.value }));
  };

  function handleDemo(event) {
    event.preventDefault();

    userType == "college-admission-officer" ||
    userType == "college-students-and-alumni"
      ? setUserLoginInfo({
          email: "nylevenya@brown.edu",
          password: "2003nyleve",
        })
      : setUserLoginInfo({
          email: "nylevenya@hotmail.com",
          password: "2003nyleve",
        });
  }
  async function handleLogin(event) {
    event.preventDefault();

    let result = await axios.post(
      BASE_URL+"/auth/login" + `/${userType}`,
      {
        email: userLoginInfo.email,
        password: userLoginInfo.password,
      }
    );

    if (result.data.message) {
      navigate("/login");
      setError(result?.data);
    } else {
      localStorage.setItem("token", result.data.token);
      {
        userType == "student"
          ? setUserLoginInfo(result.data.student)
          : userType == "parent"
          ? setUserLoginInfo(result.data.parent)
          : userType == "college-admission-officer"
          ? setUserLoginInfo(result.data.admissionOfficer)
          : userType == "college-students-and-alumni"
          ? setUserLoginInfo(result.data.alum)
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
    }
  }

  return (
    <div className="login-page">
      <h1 className="user-type-prompt">Welcome Back!</h1>
      <div className="user-types">
        <button
          className="student"
          value="student"
          onClick={handleChangeUserType}
          style={{ color: userType === "student" ? "black" : "" , background: userType==="student"? "gold":""}}
        >
          Student
        </button>

        <button
          className="parent"
          value="parent"
          onClick={handleChangeUserType}
          style={{ color: userType === "parent" ? "black" : "" , background: userType==="parent"? "gold":""}}
        >
          Parent/Guardian of Student
        </button>

        <button
          className="college-admission-officer"
          value="college-admission-officer"
          onClick={handleChangeUserType}
          style={{
            color:
              userType === "college-admission-officer" ? "black" : "", background: userType==="college-admission-officer"? "gold":""
          }}
        >
          College Admission Officer
        </button>
        <button
          className="college-students-and-alumni"
          value="college-students-and-alumni"
          onClick={handleChangeUserType}
          style={{
            color:
              userType === "college-students-and-alumni" ? "black" : "", background: userType==="college-students-and-alumni"? "gold":""
          }}
        >
          College Student/Alum
        </button>
      </div>

      {userType ? (
        <div className="student-registration">
          <h2 className="login_header">Login</h2>
          <form className="login-form">
            <div className="email">
              <input
                className="email-input"
                type="email"
                placeholder="Email"
                value={userLoginInfo?.email}
                onChange={handleEmailInputChange}
              ></input>
            </div>
            <div className="password">
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

            <div className="error" style={{ color: "#cc0000" }}>
              {error.status ? "Login Failed: " + error.message : null}
            </div>
          </form>
          <div className="bottom_buttons">
            {process.env.NODE_ENV === "development" ?
            <button className="demo-button" onClick={handleDemo}>
              Demo Login
            </button>: null}
            <button className="login-submit" onClick={handleLogin}>
              Submit
            </button>
          </div>
          <div className="register_prompt">
            Don't have an account?
            <Link style={{ color: "#a57548" }} to={"/register"}>
              {" "}
              Register{" "}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
