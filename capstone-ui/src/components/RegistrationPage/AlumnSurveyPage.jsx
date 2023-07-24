import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function AlumnSurveyPage({
  userLoginInfo,
  setError,
  setUserLoginInfo,
  userType,
}) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState({});
  const [graduationYear, setGraduationYear] = useState({ collegeYr: "" });
  const [selectedCollege, setSelectedCollege] = useState();
  const [collegeOptions, setCollegeOptions] = useState([]);

  const collegeYearOptions = Array.from({ length: 44 }, (_, i) => ({
    value: 2023 - i,
    label: 2023 - i.toLocaleString(),
  }));

  useEffect(() => {
    {
      console.log("about to get colleges");
      axios.post("http://localhost:3010/collegeList").then((response) => {
        console.log("thecoleegess", response.data);
        setCollegeOptions(response.data);
      });
    }
  }, []);

  function handleCollegeYearSelect(event) {
    // TODO: fix this line 
    setGraduationYear({ ...graduationYear, collegeYr: event.value });
    setUserLoginInfo({
        ...userLoginInfo,
        collegeGradYear: event.value
      });
  }

  function handleCollegeSelect(event) {
    // TODO: fix this func
    // console.log("event: ", event)
    setUserLoginInfo({
        ...userLoginInfo,
        college: event.value
      });
  }

  async function handleAlumniRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post("http://localhost:3010/auth/register/alum", {
        email: userLoginInfo.email,
        firstName: userLoginInfo.firstName,
        lastName: userLoginInfo.lastName,
        college: userLoginInfo.college,
        collegeGradYear: userLoginInfo.collegeGradYear
      });

      console.log("result on frontend: ", result);
      navigate("/login" + `/${userType}`);

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
          enrollment: 0,
          schoolType: "",
          college: "",
          collegeGradYear: ""
        });
      }
    }
  }
  console.log("button: ", selectedButton.highsch);

  return (
    <div className="alumn-survery-page">
      <div className="first-question-input">
        Are you a high school graduate?
        <button
          onClick={() =>
            setSelectedButton({ ...selectedButton, highsch: "Yes" })
          }
        >
          Yes
        </button>
        <button
          onClick={() =>
            setSelectedButton({ ...selectedButton, highsch: "No" })
          }
        >
          No
        </button>
        {selectedButton.highsch == "Yes" ? (
          <div className="yearOfGrad">
            <div className="AreYouCollegeGrad">
              Are you a college graduate ?
              <button
                onClick={() =>
                  setSelectedButton({ ...selectedButton, collegeUni: "Yes" })
                }
              >
                Yes
              </button>
              <button
                onClick={() =>
                  setSelectedButton({ ...selectedButton, collegeUni: "No" })
                }
              >
                No
              </button>
              {selectedButton.collegeUni == "Yes" ? (
                <div className="yearOfCollegeGrad">
                  What year did you graduate college ?
                  <Select
                    options={collegeYearOptions}
                    onChange={handleCollegeYearSelect}
                    value={collegeYearOptions.find(
                      (option) => option.value === graduationYear
                    )}
                  ></Select>
                  {graduationYear ? (
                    <div className="whatCollege">
                      What College did you graduate from ?
                      <Select
                        options={collegeOptions}
                        onChange={handleCollegeSelect}
                        value={collegeOptions.find(
                          (option) => option.value === selectedCollege
                        )}
                      ></Select>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : selectedButton.collegeUni == "No" ? (
                <div>
                  <button>Submit Here</button>
                </div>
              ) : null}
            </div>
          </div>
        ) : selectedButton.highsch == "No" ? (
          <div className="redirectToRegister">
            Please register as a student
            <Link to={"/register"}> Register Here </Link>
          </div>
        ) : null}
      </div>
      <button className="registration-submit" onClick={handleAlumniRegistration}>
        <Link to={"/register"}> Submit</Link>
      </button>
    </div>
  );
}
