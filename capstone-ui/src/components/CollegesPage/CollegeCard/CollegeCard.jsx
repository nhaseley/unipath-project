import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function CollegeCard({ college }) {
  let satScore = parseInt(college.sat_score_critical_reading) + parseInt(college.sat_score_writing) + parseInt(college.sat_score_math)
  // console.log("SCORE FOR COLLEGE DISPLAYED: ", satScore)

  return (
    <div className="college-card">
      <Link to={"/info/" + college.name} className="college-link">
    
      {satScore || college.act_score? (
        <>
          <h3>{college.name}</h3>
          <div className="scores">
            <div className="median-sat"></div>
            Median SAT Score:
            <div>{satScore != 0 ? satScore : "Unavailable"}</div>
            <div className="median-act"></div>
            Median ACT Score:
            <div>{college.act_score ? college.act_score : "Unavailable"}</div>
            <div>
              Enrollment Size: {college.size}
            </div>
          </div>
        </>
      ) : null}
        </Link>
    </div>
  );
}
