import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./AlumnSurveyPage.css";

export default function AlumnSurveyPage({
  userLoginInfo,
  setUserType,
  setError,
  setUserLoginInfo,
  nextAlumnRegistrationPage,
  setNextAlumnRegistrationPage,
}) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState({});
  const [graduationYear, setGraduationYear] = useState();
  const [collegeOptions, setCollegeOptions] = useState([]);

  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  const collegeYearOptions = Array.from({ length: 44 }, (_, i) => ({
    value: 2023 - i,
    label: 2023 - i.toLocaleString(),
  }));

  useEffect(() => {
    {
      axios.post(BASE_URL+"/collegeList").then((response) => {
        setCollegeOptions(response.data);
      });
    }
  }, []);

  function handleCollegeYearSelect(event) {
    setGraduationYear(event.value);
    setUserLoginInfo({
      ...userLoginInfo,
      collegeGradYear: event.value,
    });
  }

  function handleCollegeSelect(event) {
    setUserLoginInfo({
      ...userLoginInfo,
      collegeName: event.target.value,
    });
  }

  function handleAlumnBack() {
    setNextAlumnRegistrationPage(!nextAlumnRegistrationPage);
  }

  async function handleAlumniRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(
        BASE_URL+"/auth/register/college-students-and-alumni",
        {
          email: userLoginInfo.email,
          firstName: userLoginInfo.firstName,
          lastName: userLoginInfo.lastName,
          password: userLoginInfo.password,
          collegeName: userLoginInfo.collegeName,
          collegeGradYear: userLoginInfo.collegeGradYear,
        }
      );

      if (result.data.status) {
        setError(result.data);
        handleAlumnBack()
        navigate("/register"); 
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
          collegeName: "",
          collegeGradYear: "",
        });
      }
    }
  }

  return (
    <div className="alumn-survey-page">
      <h2 className="create_alum_header">
        Create an College Student/Alum account:
      </h2>
      <div className="first-question-input">
        <div style={{marginBottom: "1vh"}}> Are you a high school graduate?</div>
        <div className="yes_no_container">
          <button
            className="yes_button"
            onClick={() =>
              setSelectedButton({ ...selectedButton, highsch: "Yes" })
            }
            style={{
              background: selectedButton.highsch === "Yes" ? "lightBlue" : ""
            }}
          >
            Yes
          </button>
          <button
            className="no_button"
            onClick={() =>
              setSelectedButton({ ...selectedButton, highsch: "No" })
            }
            style={{
              background: selectedButton.highsch === "No" ? "lightBlue" : ""
            }}
          >
            No
          </button>
        </div>
        {selectedButton.highsch == "Yes" ? (
          <div className="studentsAndAlumniInfo">
            <div className="whatCollege" style={{marginBottom: "2vh"}}>
              <div style={{marginBottom: "1vh"}}>
                What college are you affiliated with? You may search.
              </div>
              <div>
                <select
                  className="select_college_bar"
                  onChange={handleCollegeSelect}
                >
                  {/* Sorting dropdown options in alphabetical order */}
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
            </div>
            <div className="AreYouCollegeGrad">
              <div style={{marginBottom: "1vh"}}> Are you a college graduate?</div>
              <div className="yes_no_container">
                <button
                  className="yes_button"
                  onClick={() =>
                    setSelectedButton({ ...selectedButton, collegeUni: "Yes" })
                  }
                  style={{
                    background:
                      selectedButton.collegeUni === "Yes" ? "lightBlue" : "",
                      marginBottom: "2vh"
                  }}
                >
                  Yes
                </button>
                <button
                  className="no_button"
                  onClick={() =>
                    setSelectedButton({ ...selectedButton, collegeUni: "No" })
                  }
                  style={{
                    background:
                      selectedButton.collegeUni === "No" ? "lightBlue" : "",

                  }}
                >
                  No
                </button>
              </div>
            </div>
            {selectedButton.collegeUni == "Yes" ? (
              <div className="yearOfCollegeGrad">
                What year did you graduate college?
                <Select
                  options={collegeYearOptions}
                  onChange={handleCollegeYearSelect}
                  value={collegeYearOptions.find(
                    (option) => option.value === graduationYear
                  )}
                ></Select>
              </div>
            ) : null}
          </div>
        ) : selectedButton.highsch == "No" ? (
          <div>
            Please register as a student
            <button
              className="redirectToRegister"
              onClick={() => {
                window.location.reload();
                setUserType("student");
              }}
            >
              <Link to={"/register"}> here. </Link>
            </button>
          </div>
        ) : null}
      </div>
      <div className="bottom_buttons">
        <button className="back-to-register-button" onClick={handleAlumnBack}>
          Back
        </button>
        <button
          className="registration-submit"
          onClick={handleAlumniRegistration}
        >
          <Link to={"/register/college-students-and-alumni"}> Submit</Link>
        </button>
      </div>
    </div>
  );
}
