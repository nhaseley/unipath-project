import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function AdminRegistrationPage({
  userLoginInfo,
  setUserLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
  setError,
}) {
  const navigate = useNavigate();
  const [collegeOptions, setCollegeOptions] = useState([]);

  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  useEffect(() => {
    {
      axios.post(BASE_URL+"/collegeList").then((response) => {
        setCollegeOptions(response.data);
      });
    }
  }, []);

  function handleCollegeSelect(event) {
    setUserLoginInfo({
      ...userLoginInfo,
      college: event.target.value,
    });
  }

  function handleDemo() {
    setUserLoginInfo({
      // work mail accounted for...edu
      email: "nylevenya@brown.edu",
      firstName: "nya",
      lastName: "haseley-ayende",
      password: "2003nyleve",
      confirmPassword: "2003nyleve",
      collegeName: "Brown University",
    });
  }
  async function handleAdminRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(
        BASE_URL+"/auth/register/college-admission-officer",
        {
          email: userLoginInfo.email,
          firstName: userLoginInfo.firstName,
          lastName: userLoginInfo.lastName,
          collegeName: userLoginInfo.collegeName,
          password: userLoginInfo.password,
        }
      );

      if (result.data.status) {
        setError(result.data);
      } else {
        navigate("/login");
        setError({});
        setUserLoginInfo({
          email: "",
          firstName: "",
          lastName: "",
          parentPhone: "",
          zipcode: "",
          password: "",
          confirmPassword: "",
          examScores: {},
          enrollment: 0,
          schoolType: "",
          college: "",
          collegeGradYear: "",
        });
      }
    }
  }

  return (
    <div className="student-registration">
      <div className="admin-logged-in-page">
        <h2 className="create_admin_header">
          Create a College Admission Officer account:
        </h2>
        <div className="asterisk-message"> Inputs with an asterisk are required. </div>
        <form className="registration-form">
          <div className="names">
            <div className="first-name">
              <input
                className="first-name-input"
                type="text"
                placeholder="First Name *"
                value={userLoginInfo.firstName}
                onChange={(e) =>
                  setUserLoginInfo((u) => ({
                    ...u,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>

            <div className="last-name">
              <input
                className="last-name-input"
                type="text"
                placeholder="Last Name *"
                value={userLoginInfo.lastName}
                onChange={(e) =>
                  setUserLoginInfo((u) => ({
                    ...u,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="work-email">
            <input
              className="email-input"
              type="email"
              placeholder="Work/Institution Email *"
              value={userLoginInfo.email}
              onChange={(e) =>
                setUserLoginInfo((u) => ({ ...u, email: e.target.value }))
              }
            ></input>
          </div>

          <div className="password">
            <input
              className="password-input"
              type={passwordDisplayed.password ? "text" : "password"}
              placeholder="Password *"
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
            <input
              name="confirm-password"
              type={passwordDisplayed.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password *"
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
          </div>
          <div className="error" style={{ color: "#cc0000" }}>
            {error.status ? "Registration Failed: " + error.message : null}
          </div>
          <div className="select_college_admin_container">
            <p className="p_select_college">Please Select Your Institution. You may search. * </p>
            <select
              className="select_college_admin_bar"
              onChange={handleCollegeSelect}
            >
              {/* Sorting dropdown options in alphabetical order */}
              {/* wb the onclick to make the decision */}
              {collegeOptions
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((college, i) => (
                  <option key={i} value={college.name}>
                    {college.name}
                  </option>
                ))}
            </select>
          </div>
        </form>
        <div className="bottom_buttons">
          {process.env.NODE_ENV === "development" ?
          <button className="demo-button" onClick={handleDemo}>
            Demo Registration
          </button>: null}
          <button
            className="registration-submit"
            onClick={handleAdminRegistration}
          >
            <Link to={"/register/"}> Submit</Link>
          </button>
        </div>
      </div>
      <div className="login_prompt">
        Already have an account?
        <Link style={{ color: "#a57548" }} to={"/login"}>
          {" "}
          Login{" "}
        </Link>
      </div>
    </div>
  );
}
