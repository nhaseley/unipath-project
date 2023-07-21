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
}) {
  const [pageID, setPageID] = useState(1);

  const apiKey = "AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF";
  const ORIGINAL_COLLEGE_API_URL =
    "https://api.data.gov/ed/collegescorecard/v1/schools?";

  const createEndpointUrl = (pageID) =>
    `${ORIGINAL_COLLEGE_API_URL}page=${pageID}&api_key=${apiKey}`;

  async function getCollegeGrid() {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios
        .post("http://localhost:3010/colleges", {
          satScore: userLoginInfo.satScore,
          actScore: userLoginInfo.actScore,
          enrollment: userLoginInfo.enrollment,
          schoolType: userLoginInfo.schoolType,
        })
        .then((response) => {
          console.log("colleges in front: ", response.data);
          setCollegeList((prevList) => [...prevList, ...response?.data]);
        });
    }
  }
  useEffect(() => {
    getCollegeGrid();
  }, []);

  function incrementPage(event) {
    setPageID((pageID) => pageID + 1);
    event.preventDefault();
  }


  return (
    <div className="college-grid">
      <div className="content">
        <h1> Hi, ___, here are your personalized colleges! </h1>
        <div className="colleges">
          {collegeList?.map((college, index) =>

            // (college.latest.admissions.act_scores.cumulative
            //   ? Math.abs(
            //       college.latest.admissions.act_scores.cumulative -
            //         userScores.actScore
            //     ) <= 4
            //   : null) ? (
              //   ||
              // (college.latest.student.size && userLoginInfo.enrollment != 0
              //   ? userLoginInfo.enrollment == 5000
              //     ? college.latest.student.size < 5000
              //     : userLoginInfo.enrollment == 7000
              //     ? 5000 <= college.latest.student.size <= 10000
              //     : userLoginInfo.enrollment == 10000
              //     ? college.latest.student.size > 10000
              //     : null
              //   : null)
              //   ||
              // (userLoginInfo.schoolType != ""
              //   ? (userLoginInfo.schoolType == "men_only"
              //       ? college.latest.school.men_only == 1
              //       : null)
              //       ||
              //     (userLoginInfo.schoolType == "women_only"
              //       ? college.latest.school.women_only == 1
              //       : null)
              //       ||
              //     (userLoginInfo.schoolType == "historically_black"
              //       ? college.latest.school.minority_serving.historically_black ==
              //           1
              //           ||
              //         college.latest.school.minority_serving
              //           .predominantly_black == 1
              //       : null)
              //       ||
              //     (userLoginInfo.schoolType == "tribal"
              //       ? college.latest.school.minority_serving.tribal == 1
              //       : null)
              //       ||
              //     (userLoginInfo.schoolType == "annh"
              //       ? college.latest.school.minority_serving.annh == 1
              //       : null)
              //       ||
              //     (userLoginInfo.schoolType == "aanipi"
              //       ? college.latest.school.minority_serving.aanipi == 1
              //       : null)
              //   : null)
              // <CollegeCard college={college.latest} key={index} />
              <CollegeCard college={college} key={index} />
          //   ) : null
          // )}
          )}
        </div>
        <button onClick={incrementPage} value={pageID}>
          See More Colleges
        </button>
      </div>
    </div>
  );
}
