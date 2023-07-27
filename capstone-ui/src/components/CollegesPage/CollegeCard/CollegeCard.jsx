import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function CollegeCard({ college, setUserLoginInfo }) {
  let satScore = parseInt(college.sat_score_critical_reading) + parseInt(college.sat_score_writing) + parseInt(college.sat_score_math)
  function changeCollege() {
      setUserLoginInfo((u) => ({ ...u, college: college.name }))
  }

  return (
    <div className="college-card">
      
      <Link to={"/info/" + college.name} className="college-link" onClick={changeCollege}>
    
      {/* {satScore || college.act_score? ( */}
        <>
          <h3>{college.name}</h3>
          <div className="scores">
            <div className="median-sat"></div>
            Median SAT Score:
            <div>{!isNaN(satScore) ? satScore : "Unavailable"}</div>
            <div className="median-act"></div>
            Median ACT Score:
            <div>{college.act_score ? college.act_score : "Unavailable"}</div>
            <div>
              Enrollment Size: {parseInt(college.size).toLocaleString()}
            </div>
            <div>
            Tuition: ${parseFloat(college.tuition_out_of_state).toLocaleString()}
            </div>
          </div>
        </>
      {/* ) : null} */}
        </Link>
    </div>
  );
}
