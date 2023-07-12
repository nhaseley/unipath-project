import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";

export default function CollegeCard({ college }) {
  // const [scoreList, setScoreList] = useState(0)
  let satScore = Object.values(college.admissions.sat_scores.midpoint).reduce(
    (total, score) => total + score,
    0
  );
  let actScore = Object.values(college.admissions.act_scores.midpoint).reduce(
    (total, score) => total + score,
    0
  );
  console.log(satScore);

  return (
    <div className="college-card">
      {satScore || actScore? (
        <>
          <div>{college.school.name}</div>
          <div className="scores">
            <div className="median-sat"></div>
            Median SAT Score:
            <div>{satScore != 0 ? satScore : "Unavailable"}</div>
            <div className="median-act"></div>
            Median ACT Score:
            <div>{actScore != 0 ? actScore : "Unavailable"}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
