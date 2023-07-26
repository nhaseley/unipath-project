import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeCard from "../CollegeCard/CollegeCard";

export default function CollegeGrid({
  userLoginInfo,
  collegeList,
  setCollegeList,
  collegeArrayPointer,
  setCollegeArrayPointer,
  collegesToDisplay,
  setCollegesToDisplay
}) {  

  // Function to display colleges on the grid
  async function getCollegeGrid() {
    {
      axios
        .post("http://localhost:3010/colleges", {
          satScore: userLoginInfo.satScore,
          actScore: userLoginInfo.actScore,
          enrollment: userLoginInfo.enrollment,
          schoolType: userLoginInfo.schoolType,
        })
        .then((response) => {
          console.log("colleges for this user: ", response.data);
          setCollegeList((prevList) => [...prevList, ...response?.data]);
          setCollegesToDisplay((prevList) => [...prevList, ...response?.data])
        });
    }
  }

  // UseEffect to display colleges on the grid
  useEffect(() => {
    getCollegeGrid();
  }, [userLoginInfo, collegeArrayPointer]);

  function incrementPage() {
    setCollegeArrayPointer(collegeArrayPointer + 20);
  }

  let first20Colleges = collegesToDisplay.slice(collegeArrayPointer, collegeArrayPointer+20)
  first20Colleges?.map((college) => (
  //   // console.log("sat: ", parseInt(college.sat_score_critical_reading) + parseInt(college.sat_score_writing) + parseInt(college.sat_score_math))
    console.log("size: ", parseInt(college.tuition_out_of_state)))
  )
  return (
    <div className="college-grid">
      <div className="content">
        <h1>
          Hi {userLoginInfo.firstName != "" ? userLoginInfo.firstName : null},
          here are your personalized colleges!
        </h1>
        <div className="colleges">
          {first20Colleges?.map((college, index) => (
            <CollegeCard college={college} key={index} />
          ))}
          {/* change functionality to be able to back to previous colleges */}
        </div>
        <button onClick={incrementPage}>See More Colleges</button>
      </div>
    </div>
  );
}
