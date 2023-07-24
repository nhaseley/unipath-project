import { Link, useNavigate } from "react-router-dom";

export default function AdminRegistrationPage({
  admissionLoginInfo,
  setAdmissionLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
}) {
  function handleDemo() {
    setAdmissionLoginInfo({
      // work mail accounted for...edu
      email: "nylevenya@brown.edu",
      firstName: "nya",
      lastName: "haseley-ayende",
      password: "2003nyleve",
      confirmPassword: "2003nyleve",
      college: "Brown University",
    });
  }

  return (
    <div className="admin-registration">
      <h2>Create a College Admission Officer account</h2>
      <form className="admin-form">
        <div className="names">
          <div className="first-name">
            <input
              className="first-name-input"
              type="text"
              placeholder="First Name"
              value={admissionLoginInfo.firstName}
              onChange={(e) =>
                setAdmissionLoginInfo((u) => ({
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
              value={admissionLoginInfo.lastName}
              onChange={(e) =>
                setAdmissionLoginInfo((u) => ({
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
            value={admissionLoginInfo.email}
            onChange={(e) =>
              setAdmissionLoginInfo((u) => ({ ...u, email: e.target.value }))
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
            value={admissionLoginInfo.password}
            onChange={(e) =>
              setAdmissionLoginInfo((u) => ({ ...u, password: e.target.value }))
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
            value={admissionLoginInfo.confirmPassword}
            onChange={(e) =>
              setAdmissionLoginInfo((u) => ({
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
              error.message +
              ". " +
              error.status +
              " Error."
            : null}
        </div>
        {/* include college dropdown goes here */}

        <div>* select college here *</div>
      </form>

      <button className="demo-button" onClick={handleDemo}>
        Demo Registration
      </button>
    </div>
  );
}
