import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";

export default function CollegeCard({ college }) {
  // const [scoreList, setScoreList] = useState(0)
  let satScore = Object.values(college.admissions.sat_scores.midpoint).reduce(
    (total, score) => total + score,
    0
  );
  console.log("size: ", college.student.size)  
  // console.log("act: ", college.admissions.act_scores.midpoint.cumulative)

  return (
    <div className="college-card">
      {satScore || college.admissions.act_scores.midpoint.cumulative? (
        <>
          <div>{college.school.name}</div>
          <div className="scores">
            <div className="median-sat"></div>
            Median SAT Score:
            <div>{satScore != 0 ? satScore : "Unavailable"}</div>
            <div className="median-act"></div>
            Median ACT Score:
            <div>{college.admissions.act_scores.midpoint.cumulative != 0 ? college.admissions.act_scores.midpoint.cumulative : "Unavailable"}</div>
            <div>
              Enrollment Size: {college.student.size}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
