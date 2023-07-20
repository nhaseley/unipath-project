import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function CollegeCard({ college }) {
  // console.log("college: ", college)
  let satScore = Object.values(college.admissions.sat_scores.midpoint).reduce(
    (total, score) => total + score,
    0
  );
  // console.log("sat: ", satScore)
  // console.log("size: ", college.student.size)  
  // console.log("act: ", college.admissions.act_scores.midpoint.cumulative)

  return (
    <div className="college-card">
      <Link to={"/info/" + college.school.name} className="college-link">
    
      {satScore || college.admissions.act_scores.midpoint.cumulative? (
        <>
          <div>{college.school.name}</div>
          <div className="scores">
            <div className="median-sat"></div>
            Median SAT Score:
            <div>{satScore != 0 ? satScore : "Unavailable"}</div>
            <div className="median-act"></div>
            Median ACT Score:
            <div>{college.admissions.act_scores.midpoint.cumulative ? college.admissions.act_scores.midpoint.cumulative : "Unavailable"}</div>
            <div>
              Enrollment Size: {college.student.size}
            </div>
          </div>
        </>
      ) : null}
        </Link>
    </div>
  );
}
