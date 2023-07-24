import * as React from "react";
import "./RegistrationPage.css";
import jwtDecode from "jwt-decode";
import StudentRegistrationForm from "./StudentRegistrationForm";
import ParentRegistrationForm from "./ParentRegistrationForm";
import AlumnRegistrationPage from "./AlumnRegistrationPage";

export default function RegistrationPage({
  userLoginInfo,
  setUserLoginInfo,
  handleShowPassword,
  handleHidePassword,
  passwordDisplayed,
  error,
  setError,
  userType,
  setUserType,
}) {
  function handleChangeUserType(event) {
    setUserType(event.target.value);
  }
  return (
    <div className="registration-page">
      <h1 className="user-type-prompt">
        Which of the following best identifies you?
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
          Parent of Student
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
          College student/alum
        </button>
      </div>

      {userType == "student" ? (
        <StudentRegistrationForm
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          handleShowPassword={handleShowPassword}
          handleHidePassword={handleHidePassword}
          passwordDisplayed={passwordDisplayed}
          error={error}
        ></StudentRegistrationForm>
      ) : userType == "parent" ? (
        <ParentRegistrationForm
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          handleShowPassword={handleShowPassword}
          handleHidePassword={handleHidePassword}
          passwordDisplayed={passwordDisplayed}
          error={error}
          setError={setError}
        ></ParentRegistrationForm>
      ) : userType == "college-students-and-alumni" ? (
        <AlumnRegistrationPage
        userLoginInfo={userLoginInfo}
        setUserLoginInfo={setUserLoginInfo}
        handleShowPassword={handleShowPassword}
        handleHidePassword={handleHidePassword}
        passwordDisplayed={passwordDisplayed}
        error={error}
        setError={setError}
        ></AlumnRegistrationPage>
      ) : null}
    </div>
  );
}
