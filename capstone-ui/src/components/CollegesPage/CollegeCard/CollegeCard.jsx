import * as React from "react";
import "./CollegeCard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CollegeCard({
  college,
  setUserLoginInfo,
  convertCollegeSAT,
  userLoginInfo
}) {
  const [satScore, setSATScore] = useState()
  let reading = college?.sat_score_critical_reading ? parseInt(college?.sat_score_critical_reading):0
  let writing = college?.sat_score_writing?parseInt(college?.sat_score_writing):0
  let math = college?.sat_score_math?parseInt(college?.sat_score_math):0

  async function getUpdatedScore(reading, writing, math) {
    let updatedScore = await convertCollegeSAT(
      `${
        reading + writing + math
      }`
    );
    setSATScore(updatedScore)
  }
  useEffect(() => {
    getUpdatedScore(reading, writing, math);
  }, [userLoginInfo]);

  function changeCollege() {
    localStorage.setItem("selected-college", college.name);
    setUserLoginInfo((u) => ({ ...u, collegeName: college.name }));
  }

  return (
    <div className="college-card">
      <Link
        to={"/info/" + college.name}
        className="college-link"
        onClick={changeCollege}
      >
        <div className="card-info">
          <h3>{college.name}</h3>
          <div className="scores">
            <div className="median-sat">
              {" "}
              Median SAT Score: {!isNaN(satScore)
                ? satScore
                : "Unavailable"}{" "}
            </div>

            <div className="median-act">
              {" "}
              Median ACT Score:{" "}
              {college.act_score ? college.act_score : "Unavailable"}{" "}
            </div>

            <div>
              Enrollment Size: {parseInt(college.size).toLocaleString()}
            </div>
            <div>
              Tuition: $
              {parseFloat(college.tuition_out_of_state).toLocaleString()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
