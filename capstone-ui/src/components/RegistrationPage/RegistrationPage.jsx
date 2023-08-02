import * as React from "react";
import "./RegistrationPage.css";
import jwtDecode from "jwt-decode";
import StudentRegistrationForm from "./StudentRegistrationForm";
import ParentRegistrationForm from "./ParentRegistrationForm";
import AlumnRegistrationPage from "./AlumnRegistrationPage";
import AdminRegistrationPage from "./AdminRegistrationPage";
import RegistrationSurveyPage from "./RegistrationSurveyPage";
import AlumnSurveyPage from "./AlumnSurveyPage";

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
  // for the student survey "Next" button
  nextRegistrationPage,
  setNextRegistrationPage,
  // for the Alumn survey "Next" button
  nextAlumnRegistrationPage,
  setNextAlumnRegistrationPage,
}) {
  function handleChangeUserType(event) {
    setNextRegistrationPage(true);
    setNextAlumnRegistrationPage(true);
    setUserType(event.target.value);
  }

  return (
    <div className="registration-page">
      <h1 className="user-type-prompt">
        Which of the following best describes you?
      </h1>
      <div className="user-types">
        <button
          className="student"
          value="student"
          onClick={handleChangeUserType}
          style={{ background: userType === "student" ? "lightblue" : "" }}
        >
          Student
        </button>

        <button
          className="parent"
          value="parent"
          onClick={handleChangeUserType}
          style={{ background: userType === "parent" ? "lightblue" : "" }}
        >
          Parent/Guardian of Student
        </button>

        <button
          className="college-admission-officer"
          value="college-admission-officer"
          onClick={handleChangeUserType}
          style={{ background: userType === "college-admission-officer" ? "lightblue" : "" }}
        >
          College Admission Officer
        </button>
        <button
          className="college-students-and-alumni"
          value="college-students-and-alumni"
          onClick={handleChangeUserType}
          style={{ background: userType === "college-students-and-alumni" ? "lightblue" : "" }}
        >
          College Student/Alum
        </button>
      </div>

      {userType == "student" ? (
        nextRegistrationPage ? (
          <StudentRegistrationForm
            userLoginInfo={userLoginInfo}
            setUserLoginInfo={setUserLoginInfo}
            handleShowPassword={handleShowPassword}
            handleHidePassword={handleHidePassword}
            passwordDisplayed={passwordDisplayed}
            error={error}
            nextRegistrationPage={nextRegistrationPage} // setting to true onClick for next button
            setNextRegistrationPage={setNextRegistrationPage}
          />
        ) : (
          <RegistrationSurveyPage
            userLoginInfo={userLoginInfo}
            error={error}
            setError={setError}
            setUserLoginInfo={setUserLoginInfo}
            nextRegistrationPage={nextRegistrationPage}
            setNextRegistrationPage={setNextRegistrationPage}
          ></RegistrationSurveyPage>
        )
      ) : userType == "parent" ? (
        <ParentRegistrationForm
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          handleShowPassword={handleShowPassword}
          handleHidePassword={handleHidePassword}
          passwordDisplayed={passwordDisplayed}
          error={error}
          setError={setError}
        />
      ) : userType == "college-students-and-alumni" ? (
        nextAlumnRegistrationPage ? (
          <AlumnRegistrationPage
            userLoginInfo={userLoginInfo}
            setUserLoginInfo={setUserLoginInfo}
            handleShowPassword={handleShowPassword}
            handleHidePassword={handleHidePassword}
            passwordDisplayed={passwordDisplayed}
            error={error}
            setError={setError}
            nextAlumnRegistrationPage={nextAlumnRegistrationPage}
            setNextAlumnRegistrationPage={setNextAlumnRegistrationPage}
          />
        ) : (
          <AlumnSurveyPage
            userLoginInfo={userLoginInfo}
            setError={setError}
            setUserLoginInfo={setUserLoginInfo}
            userType={userType}
            nextAlumnRegistrationPage={nextAlumnRegistrationPage}
            setNextAlumnRegistrationPage={setNextAlumnRegistrationPage}
          />
        )
      ) : userType == "college-admission-officer" ? (
        <AdminRegistrationPage
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          handleShowPassword={handleShowPassword}
          handleHidePassword={handleHidePassword}
          passwordDisplayed={passwordDisplayed}
          error={error}
          setError={setError}
        />
      ) : null}
    </div>
  );
}
