import * as React from "react";
import "./CollegeCard.css";
import { useEffect, useState } from "react";

export default function CollegeCard({ college }) {
  // const [scoreList, setScoreList] = useState(0)
  let satScore = Object.values(college.admissions.sat_scores.midpoint).reduce(
    (total, score) => total + score,
    0
  );
  // let actScore = Object.values(college.admissions.act_scores.midpoint)
  // .filter((section) => section !== null)
  // .reduce(
  //   (total, section, _, array) =>
  //     total + section / array.length, 0);


  // console.log("sat: ", satScore);
  console.log("???", college.admissions.act_scores.midpoint.cumulative)
  // console.log("act: ", actScore)

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
          </div>
        </>
      ) : null}
    </div>
  );
}
