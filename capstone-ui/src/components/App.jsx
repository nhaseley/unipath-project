import * as React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./HomePage/HomePage";
import Navbar from "./NavBar/Navbar";
import LoginPage from "./LoginPage/LoginPage";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import RegistrationSurveyPage from "./RegistrationPage/RegistrationSurveyPage";
import AlumnSurveyPage from "./RegistrationPage/AlumnSurveyPage";
import CollegesPage from "./CollegesPage/CollegesPage";
import CollegeInfoPage from "./CollegesPage/CollegeInfoPage/CollegeInfoPage";
import MyCollegesPage from "./MyCollegesPage/MyCollegesPage";
import AlumniHomePage from "./AlumniHome/AlumniHomePage";
import EventsPage from "./EventsPage/EventsPage";
import ParentsPage from "./ParentsPage/ParentsPage";
import About from "./About/About";
import EventDetailsPage from "./EventsPage/EventDetailsPage";
import EventAttendeesPage from "./EventsPage/EventAttendeesPage";

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
    college: "",
    collegeGradYear: "",
  });

  const [passwordDisplayed, setPasswordDisplayed] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [collegeList, setCollegeList] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState({});
  const [userType, setUserType] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [collegeArrayPointer, setCollegeArrayPointer] = useState(0);
  const customColors = [
    "#F2DDA4",
    "#9DCBBA",
    "#1f77b4",
    "#2ca02c",
    "#8c564b",
    "#A8763E",
    "#734B5E",
    "#44633F",
    "#3F4B3B",
  ];

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  const [nextRegistrationPage, setNextRegistrationPage] = useState(true);
  // boolean for if we're on the next page (used for both students and alumni)

  const [nextAlumnRegistrationPage, setNextAlumnRegistrationPage] = useState(true);
  const [isSelected, setIsSelected] = useState("");


  const handleItemClick = (item) => {
    setIsSelected(item);
  };

  const getListItemStyle = (item) => ({
    border: isSelected === item ? "0.2vw solid #213547" : "",
    borderRadius: "2vh",
    padding: "1vh",
  });
  
  console.log("user info: ", userLoginInfo);

  async function convertCollegeSAT(oldCollegeSAT) {
    if (oldCollegeSAT) {
      let response = await axios.post(
        BASE_URL + "/getUpdatedSATScore",
        {
          oldCollegeSAT: oldCollegeSAT,
        }
      );
      return parseInt(response.data);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This creates a smooth scrolling effect
    });
  }

  useEffect(() => {
    scrollToTop();
    const selectedCollegeStored = localStorage.getItem("selected-college");
    const token = localStorage.getItem("token");
    if (!decodedToken) {
      axios
        .post(BASE_URL+"/auth/decodedtoken", {
          token: token,
        })
        .then((response) => {
          setUserLoginInfo({
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            parentPhone: response.data.parentPhone,
            zipcode: response.data.zipcode,
            satScore: response.data.satScore,
            actScore: response.data.actScore,
            enrollment: response.data.enrollment,
            schoolType: response.data.schoolType,
            collegeName: response.data.collegeName
              ? response.data.collegeName
              : selectedCollegeStored,
            collegeGradYear: response.data.collegeGradYear,
          });
          setUserType(response.data.userType);
          setDecodedToken(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving decoded token:", error);
        });
    }
  }, [userLoginInfo]);

  useEffect(() => {
    if (decodedToken) {
      setUserLoggedIn(true); // Setting appState to true, making sure the user is logged in
      const currentTime = Math.floor(Date.now() / 1000); // Getting the current time in seconds
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token"); // Removing the token from local storage
      }
    }
  }, [decodedToken]);

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

  function logoutUser() {
    localStorage.removeItem("selected-college");
    localStorage.removeItem("token");
    setUserLoggedIn(false);
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
      collegeName: "",
      collegeGradYear: "",
    });
    setUserType();
    setSelectedCollege({});
  }

  //---------------- Return Object ---------------------//

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={
              <Navbar userLoggedIn={userLoggedIn} logoutUser={logoutUser} handleItemClick={handleItemClick} getListItemStyle={getListItemStyle} />
            }
          >
            <Route
              path="/"
              element={
                <HomePage userLoggedIn={userLoggedIn} userType={userType} />
              }
            ></Route>

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
                  logoutUser={logoutUser}
                  userType={userType}
                  setUserType={setUserType}
                />
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
                  userType={userType}
                  setUserType={setUserType}
                  // for the Student survey
                  nextRegistrationPage={nextRegistrationPage}
                  setNextRegistrationPage={setNextRegistrationPage}
                  // for the Alumn survey
                  nextAlumnRegistrationPage={nextAlumnRegistrationPage}
                  setNextAlumnRegistrationPage={setNextAlumnRegistrationPage}
                />
              }
            />

            <Route
              path="/registration-survey"
              element={
                <RegistrationSurveyPage
                  userLoginInfo={userLoginInfo}
                  error={error}
                  setError={setError}
                  setUserLoginInfo={setUserLoginInfo}
                  nextRegistrationPage={nextRegistrationPage}
                  setNextRegistrationPage={setNextRegistrationPage}
                />
              }
            ></Route>

            <Route
              path="/registration-survey/alumn"
              element={
                <AlumnSurveyPage
                  userLoginInfo={userLoginInfo}
                  setError={setError}
                  setUserLoginInfo={setUserLoginInfo}
                  userType={userType}
                  setUserType={setUserType}
                  nextAlumnRegistrationPage={nextAlumnRegistrationPage}
                  setNextAlumnRegistrationPage={setNextAlumnRegistrationPage}
                />
              }
            ></Route>

            <Route
              path="/feed"
              element={
                <CollegesPage
                  userLoginInfo={userLoginInfo}
                  setUserLoginInfo={setUserLoginInfo}
                  userLoggedIn={userLoggedIn}
                  collegeList={collegeList}
                  setCollegeList={setCollegeList}
                  collegeArrayPointer={collegeArrayPointer}
                  setCollegeArrayPointer={setCollegeArrayPointer}
                  userType={userType}
                  setUserType={setUserType}
                  convertCollegeSAT={convertCollegeSAT}
                  scrollToTop={scrollToTop}
                ></CollegesPage>
              }
            ></Route>
            <Route
              path="/child-feed"
              element={
                <ParentsPage
                  userLoginInfo={userLoginInfo}
                  userLoggedIn={userLoggedIn}
                  userType={userType}
                  setUserType={setUserType}
                  setUserLoginInfo={setUserLoginInfo}
                  customColors={customColors}
                  scrollToTop={scrollToTop}
                />
              }
            ></Route>
            <Route
              path="/events"
              element={
                <EventsPage
                  userType={userType}
                  userLoginInfo={userLoginInfo}
                  userLoggedIn={userLoggedIn}
                  setUserType={setUserType}
                />
              }
            ></Route>

            <Route
              path="/eventDetails"
              element={
                <EventDetailsPage
                  setError={setError}
                  userType={userType}
                  userLoginInfo={userLoginInfo}
                  userLoggedIn={userLoggedIn}
                />
              }
            ></Route>

            <Route
              path="/mycollege"
              element={
                <AlumniHomePage
                  setError={setError}
                  setUserLoginInfo={setUserLoginInfo}
                  userLoginInfo={userLoginInfo}
                  userLoggedIn={userLoggedIn}
                  userType={userType}
                  setUserType={setUserType}
                />
              }
            ></Route>
            <Route
              path="/info/:id"
              element={
                <CollegeInfoPage
                  userLoginInfo={userLoginInfo}
                  setSelectedCollege={setSelectedCollege}
                  userType={userType}
                  customColors={customColors}
                  convertCollegeSAT={convertCollegeSAT}
                />
              }
            ></Route>

            <Route
              path="/event-info/:id"
              element={
                <EventAttendeesPage
                  userLoginInfo={userLoginInfo}
                  userType={userType}
                  error={error}
                  setError={setError}
                />
              }
            ></Route>
            <Route
              path="/like"
              element={
                <MyCollegesPage
                  userLoginInfo={userLoginInfo}
                  selectedCollege={selectedCollege}
                  userType={userType}
                  setUserType={setUserType}
                  userLoggedIn={userLoggedIn}
                />
              }
            ></Route>
            <Route path="/about" element={<About></About>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
