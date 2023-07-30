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
  setError
}) {
  const navigate = useNavigate();
  const [collegeOptions, setCollegeOptions] = useState([]);

  useEffect(() => {
    {
      axios.post("http://localhost:3010/collegeList").then((response) => {
        setCollegeOptions(response.data);
      });
    }
  }, []);

  function handleCollegeSelect(event) {
    // setSelectedCollege(event.target.value);

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
      college: "Brown University",
    });
  }
  async function handleAdminRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(
        "http://localhost:3010/auth/register/college-admission-officer",
        {
          email: userLoginInfo.email,
          firstName: userLoginInfo.firstName,
          lastName: userLoginInfo.lastName,
          college: userLoginInfo.college,
          password: userLoginInfo.password,
        }
      );
      navigate("/login");

      if (result.data.status) {
        setError(result.data);
      } else {
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
    <div className="admin-registration">
        <div className="admin-logged-in-page">
          <h2>Create a College Admission Officer account</h2>
          <form className="admin-form">
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
                      firstName: e.target.value,
                    }))
                  }
                />
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
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="work-email">
              <img
                src="https://www.transparentpng.com/download/send-email-button/DyZNCL-send-email-button-free-download-transparent.png"
                className="email-img"
              ></img>
              <input
                className="email-input"
                type="email"
                placeholder="Work/Institution Email"
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
            </div>
            <div className="error">
              {error.status
                ? "Registration Failed: " +
                  error.message
                : null}
            </div>
            <select onChange={handleCollegeSelect}>
              {/* Sorting dropdown options in alphabetical order */}
              {/* wb the onclick to make the decision */}
              {collegeOptions
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((college) => (
                  <option key={college.id} value={college.name}>
                    {college.name}
                  </option>
                ))}
            </select>
          </form>

          <button className="demo-button" onClick={handleDemo}>
            Demo Registration
          </button>
          <button
            className="registration-submit"
            onClick={handleAdminRegistration}
          >
            <Link to={"/register/"}> Submit</Link>
          </button>
        </div>
      {/* )} */}
    </div>
  );
}
