import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Navbar from "./Navbar/Navbar";
import LoginPage from "./LoginPage/LoginPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import RegistrationSurveyPage from "./RegistrationPage/RegistrationSurveyPage";
import CollegesPage from "./CollegesPage/CollegesPage";
import About from "./About/About";

export default function App() {
  //------------------ States ---------------------//

  const [userLoginInfo, setUserLoginInfo] = useState({
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

  const [passwordDisplayed, setPasswordDisplayed] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userScores, setUserScores] = useState({
    satScore: 0,
    actScore: 0,
  });
  const [enrollment, setEnrollment] = useState(0);
  const [schoolType, setSchoolType] = useState("");

  //---------------- Functions ---------------------//

  function handleShowPassword(event) {
    event.target.name === "password-toggle"
      ? setPasswordDisplayed({
          password: true,
          confirmPassword: passwordDisplayed.confirmPassword,
        })
      : setPasswordDisplayed({
          password: passwordDisplayed.password,
          confirmPassword: true,
        });
  }
  function handleHidePassword(event) {
    event.target.name === "password-toggle"
      ? setPasswordDisplayed({
          password: false,
          confirmPassword: passwordDisplayed.confirmPassword,
        })
      : setPasswordDisplayed({
          password: passwordDisplayed.password,
          confirmPassword: false,
        });
  }

  //---------------- Return Object ---------------------//

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Navbar userLoggedIn={userLoggedIn} />}>
            <Route path="/" element={<HomePage />}></Route>

            <Route
              path="/login"
              element={
                <LoginPage
                  userLoginInfo={userLoginInfo}
                  setUserLoginInfo={setUserLoginInfo}
                  handleShowPassword={handleShowPassword}
                  handleHidePassword={handleHidePassword}
                  passwordDisplayed={passwordDisplayed}
                  error={error}
                  setError={setError}
                  userLoggedIn={userLoggedIn}
                  setUserLoggedIn={setUserLoggedIn}
                  setUserScores={setUserScores}
                ></LoginPage>
              }
            />

            <Route
              path="/register"
              element={
                <RegistrationPage
                  userLoginInfo={userLoginInfo}
                  setUserLoginInfo={setUserLoginInfo}
                  handleShowPassword={handleShowPassword}
                  handleHidePassword={handleHidePassword}
                  passwordDisplayed={passwordDisplayed}
                  error={error}
                  setError={setError}
                ></RegistrationPage>
              }
            />

            <Route
              path="/registration-survey"
              element={
                <RegistrationSurveyPage
                  userLoginInfo={userLoginInfo}
                  setError={setError}
                  setUserLoginInfo={setUserLoginInfo}
                  enrollment={enrollment}
                  setEnrollment={setEnrollment}
                  schoolType={schoolType}
                  setSchoolType={setSchoolType}
                ></RegistrationSurveyPage>
              }
            ></Route>
            <Route
              path="/feed"
              element={
                <CollegesPage
                  userLoginInfo={userLoginInfo}
                  userScores={userScores}
                  enrollment={enrollment}
                  schoolType={schoolType}
                ></CollegesPage>
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
