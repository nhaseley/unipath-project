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
  const [graduationYear, setGraduationYear] = useState();
  const [selectedCollege, setSelectedCollege] = useState();
  const [collegeOptions, setCollegeOptions] = useState([]);

  const collegeYearOptions = Array.from({ length: 44 }, (_, i) => ({
    value: 2023 - i,
    label: 2023 - i.toLocaleString(),
  }));

  useEffect(() => {
    {
      axios.post("http://localhost:3010/collegeList").then((response) => {
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
      // TODO: fix this func
      setSelectedCollege(event.target.value);
      setUserLoginInfo({
        ...userLoginInfo,
        collegeName: event.target.value,
      });
    }

  async function handleAlumniRegistration(event) {
    event.preventDefault();

    if (userLoginInfo.confirmPassword !== userLoginInfo.password) {
      setError({ message: "Passwords do not match", status: 422 });
    } else {
      let result = await axios.post(
        "http://localhost:3010/auth/register/college-students-and-alumni",
        {
          email: userLoginInfo.email,
          firstName: userLoginInfo.firstName,
          lastName: userLoginInfo.lastName,
          password: userLoginInfo.password,
          collegeName: userLoginInfo.collegeName,
          collegeGradYear: userLoginInfo.collegeGradYear,
        }
      );

      navigate("/login");

      if (result.data.status) {
        setError(result.data);
      } else {
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
          <div className="studentsAndAlumniInfo">
            <div className="whatCollege">
              What college are you affiliated with?
              {/* <Select
                        options={collegeOptions.slice(0, 5)}
                        onChange={handleCollegeSelect}
                        // value={selectedCollege}
                        value={collegeOptions.find(
                          (option) => option.name === selectedCollege
                        )?.name}
                      ></Select> */}
              {/* {selectedCollege} */}
              <select onChange={handleCollegeSelect}>
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
            <div className="AreYouCollegeGrad">
              Are you a college graduate?
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
            </div>
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
              </div>
            ) : selectedButton.collegeUni == "No" ? (
              <button
                className="registration-submit"
                onClick={handleAlumniRegistration}
              >
                <Link to={"/register/college-students-and-alumni"}> Submit</Link>
              </button>
            ) : null}
          </div>
        ) : selectedButton.highsch == "No" ? (
          <div className="redirectToRegister">
            Please register as a student
            <Link to={"/register"}> here </Link>
          </div>
        ) : null}
      </div>
      <button
        className="registration-submit"
        onClick={handleAlumniRegistration}
      >
        <Link to={"/register/college-students-and-alumni"}> Submit</Link>
      </button>
    </div>
  );
}
