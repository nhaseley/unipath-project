import * as React from "react";
import { useEffect, useState } from "react";
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Select from "react-select";

export default function RegistrationSurveyPage({
  userLoginInfo,
  error,
  setError,
  setUserLoginInfo,
  nextRegistrationPage,
  setNextRegistrationPage,
}) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState({});
  const [examScores, setExamScores] = useState({ satScore: "", actScore: "" });
  const satExamScoreOptions = Array.from({ length: 121 }, (_, i) => ({
    value: i * 10 + 400,
    label: (i * 10 + 400).toString(),
  }));
  const actExamScoreOptions = Array.from({ length: 36 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString(),
  }));

  BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  async function handleRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(BASE_URL+"/auth/register", {
        email: userLoginInfo.email,
        firstName: userLoginInfo.firstName,
        lastName: userLoginInfo.lastName,
        parentPhone: userLoginInfo.parentPhone,
        zipcode: userLoginInfo.zipcode,
        password: userLoginInfo.password,
        examScores: userLoginInfo.examScores,
        enrollment: userLoginInfo.enrollment,
        schoolType: userLoginInfo.schoolType,
        college: userLoginInfo.college,
        collegeGradYear: userLoginInfo.collegeGradYear,
      });

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
          collegeName: "",
          collegeGradYear: "",
        });
      }
    }
  }

  function handleSATScoreSelect(event) {
    setExamScores({ ...examScores, satScore: event.value });
    setUserLoginInfo({
      ...userLoginInfo,
      examScores: { satScore: event.value, actScore: examScores.actScore },
    });
  }
  function handleACTScoreSelect(event) {
    setExamScores({ ...examScores, actScore: event.value });
    setUserLoginInfo({
      ...userLoginInfo,
      examScores: { satScore: examScores.satScore, actScore: event.value },
    });
  }

  function handleEnrollmentSelect(event) {
    setUserLoginInfo({
      ...userLoginInfo,
      enrollment: parseInt(event.target.value),
    });
  }

  function handleSchoolTypeSelect(event) {
    setUserLoginInfo({
      ...userLoginInfo,
      schoolType: event.target.value,
    });
  }

  function handleBack() {
    setNextRegistrationPage(!nextRegistrationPage);
  }
  return (
    <div className="registration-survey-page">
      <h2 className="create_student_header"> Create a student account: </h2>
      <div className="sat-input">
       Have you taken the SAT?
        <div className="yes_no_container">
          <button
            className="yes_button"
            onClick={() => setSelectedButton({ ...selectedButton, sat: "Yes" })}
            style={{
              background: selectedButton.sat === "Yes" ? "lightBlue" : ""
            }}
          >
            Yes
          </button>
          <button
            className="no_button"
            onClick={() => setSelectedButton({ ...selectedButton, sat: "No" })}
            style={{
              background: selectedButton.sat === "No" ? "lightBlue" : ""
            }}
          >
            No
          </button>
        </div>
        {selectedButton.sat == "Yes" ? (
          <Select
            options={satExamScoreOptions}
            onChange={handleSATScoreSelect}
            value={satExamScoreOptions.find(
              (option) => option.value === examScores
            )}
            placeholder="Select SAT score"
          />
        ) : null}
      </div>
      <div className="act-input">
        Have you taken the ACT?
        <div className="yes_no_container">
          <button
            className="yes_button"
            onClick={() => setSelectedButton({ ...selectedButton, act: "Yes" })}
            style={{
              background: selectedButton.act === "Yes" ? "lightBlue" : ""
            }}
          >
            Yes
          </button>
          <button
            className="no_button"
            onClick={() => setSelectedButton({ ...selectedButton, act: "No" })}
            style={{
              background: selectedButton.act === "No" ? "lightBlue" : "",

            }}
          >
            No
          </button>
        </div>
        {selectedButton.act == "Yes" ? (
          <Select
            options={actExamScoreOptions}
            onChange={handleACTScoreSelect}
            value={actExamScoreOptions.find(
              (option) => option.value === examScores
            )}
            placeholder="Select ACT score"
          />
        ) : null}
      </div>
      <div className="enrollment-input">
        <div  style={{marginBottom: "1vh"}}> Prospective school size? <b> Please select one.</b> </div>
        <select className="select_size_bar" onChange={handleEnrollmentSelect}>
          <option value="None"></option>
          <option value="5000"> Less than 5,000</option>
          <option value="7000"> 5,000 - 10,000</option>
          <option value="10000"> More than 10,000</option>
        </select>
      </div>
      <div className="school-type">
        <div style={{marginBottom: "1vh"}}> Any of these minority serving institutions that you expect to attend? <b>Please select one.</b></div>
        <select
          className="select_minority_bar"
          onChange={handleSchoolTypeSelect}
        >
          <option value=""></option>
          <option value="women_only"> Women only</option>
          <option value="men_only"> Men only</option>
          <option value="historically_black">
            {" "}
            Historically/predominantly Black{" "}
          </option>
          <option value="tribal"> Tribal </option>
          <option value="annh"> Alaska Native and Native Hawaiian</option>
          <option value="aanipi">
            {" "}
            Asian American, Native Hawaiian, and Pacific Islander
          </option>
        </select>
      </div>
      <div className="error" style={{ color: "#cc0000" }}>
        {error.status ? handleBack() : null}
      </div>
      <div className="bottom_buttons">
        <button className="back-to-register-button" onClick={handleBack}>
          {" "}
          Back
        </button>
        <button className="registration-submit" onClick={handleRegistration}>
          <Link to={"/register"}> Submit</Link>
        </button>
      </div>
    </div>
  );
}
