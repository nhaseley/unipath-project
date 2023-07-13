import * as React from "react";
import { useEffect, useState } from "react";
import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

export default function RegistrationSurveyPage({
  userLoginInfo,
  setError,
  setUserLoginInfo,
}) {
  const [selectedButton, setSelectedButton] = useState({});
  const [examScores, setExamScores] = useState({satScore: "", actScore: ""});
  const satExamScoreOptions = Array.from({ length: 161 }, (_, i) => ({
    value: i * 10,
    label: (i * 10).toString(),
  }));
  const actExamScoreOptions = Array.from({ length: 37 }, (_, i) => ({
    value: i,
    label: i.toString(),
  }));

  async function handleRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post("http://localhost:3010/auth/register", {
        email: userLoginInfo.email,
        firstName: userLoginInfo.firstName,
        lastName: userLoginInfo.lastName,
        parentPhone: userLoginInfo.parentPhone,
        zipcode: userLoginInfo.zipcode,
        password: userLoginInfo.password,
        examScores: userLoginInfo.examScores
      });
      console.log("result on frontend: ", result);

      if (result.data.status) {
        setError(result.data);
      } else {
        //   const token = result.data.token;
        //   localStorage.setItem("token", token);
        //   const decodedToken = jwtDecode(token);
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
        });
      }
    }
  }

  function handleSATScoreSelect(event) {
    setExamScores({...examScores, satScore: event.value});
    setUserLoginInfo({ ...userLoginInfo, examScores: {satScore:event.value, actScore:examScores.actScore }});
  }
    function handleACTScoreSelect(event){
      setExamScores({...examScores, actScore: event.value})
      setUserLoginInfo({...userLoginInfo, examScores: {satScore:examScores.satScore, actScore: event.value}})
    }

  return (
    <div className="registration-survey-page">
      <div className="sat-input"> 
        Have you taken the SAT?
        <button onClick={() => setSelectedButton({...selectedButton, sat: "Yes"})}>Yes</button>
        <button onClick={() => setSelectedButton({...selectedButton, sat: "No"})}>No</button>
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
         Have you take the ACT?
            <button onClick={() => setSelectedButton({...selectedButton, act: "Yes"})}>Yes</button>
        <button onClick={() => setSelectedButton({...selectedButton, act: "No"})}>No</button>
        {selectedButton.act == "Yes" ? (
            <Select
              options={actExamScoreOptions}
              onChange={handleACTScoreSelect}
              value={actExamScoreOptions.find(
                (option) => option.value === examScores
              )}
              placeholder="Select ACT score"
            /> 
        ): null}
     
      <button className="registration-submit" onClick={handleRegistration}>
        <Link to={"/register"}> Submit</Link>
      </button>
      {/* <button className="back-to-register-button">
      
      </button> */}
    </div>
  );
}
