import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ParentRegistrationForm({
  userLoginInfo,
  setUserLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
  setError,
}) {
  const navigate = useNavigate();

  function handleDemo() {
    setUserLoginInfo({
      email: "nylevenya@hotmail.com",
      firstName: "nya",
      lastName: "haseley-ayende",
      parentPhone: "6464080591",
      password: "2003nyleve",
      confirmPassword: "2003nyleve",
    });
  }
  async function handleParentRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(
        "http://localhost:3010/auth/register/parent",
        {
          email: userLoginInfo.email,
          firstName: userLoginInfo.firstName,
          lastName: userLoginInfo.lastName,
          parentPhone: userLoginInfo.parentPhone,
          password: userLoginInfo.password,
        }
      );

      if (result.data.status) {
        navigate("/register");
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
        });
      }
    }
  }
  return (
    <div className="student-registration">
      <h2 className="create_parent_header">
        Create a Parent/Guardian account:
      </h2>
      <p className="parent_prompt">
        Your phone number must match the phone number exactly listed on your
        scholar's account!
      </p>
      <form className="registration-form">
        <div className="email">
          {/* <img
            src="https://www.transparentpng.com/download/send-email-button/DyZNCL-send-email-button-free-download-transparent.png"
            className="email-img"
          ></img> */}
          <input
            className="email-input"
            type="email"
            placeholder="Parent Email"
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
                  firstName: e.target.value,
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
                  lastName: e.target.value,
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
                parentPhone: e.target.value,
              }))
            }
          ></input>
        </div>

        <div className="password">
          {/* <img
            src="https://www.pngitem.com/pimgs/m/140-1407340_lock-icon-clipart-png-download-white-login-password.png"
            className="password-img"
          ></img> */}
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
          {/* <img
            src="https://www.pngitem.com/pimgs/m/140-1407340_lock-icon-clipart-png-download-white-login-password.png"
            className="password-img"
          ></img> */}

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
          {error.status ? "Registration Failed: " + error.message : null}
        </div>
      </form>
      <button className="demo-button" onClick={handleDemo}>
        Demo Registration
      </button>
      <button
        className="registration-submit"
        onClick={handleParentRegistration}
      >
        <Link to={"/register/parent"}> Submit</Link>
      </button>

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
