import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeCard from "../CollegeCard/CollegeCard";

export default function CollegeGrid({
  userLoginInfo,
  userScores,
  collegeList,
  setCollegeList,
}) {
  const [pageID, setPageID] = useState(1);

  const apiKey = "AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF";
  const ORIGINAL_COLLEGE_API_URL =
    "https://api.data.gov/ed/collegescorecard/v1/schools?";
  // const brownUrl = `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=Brown-University&school.city=Providence&api_key=${apiKey}`;
  //   const createEndpointUrl = (schoolName, schoolCity) =>
  // `${ORIGINAL_COLLEGE_API_URL}&school.name=${schoolName}&school.city=${schoolCity}&api_key=${apiKey}`;
  useEffect(() => {
      axios.get("https://api.data.gov/ed/collegescorecard/v1/schools?school.name=Brown-University&school.city=Providence&api_key=AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF")
      .then((response2) => {
        // console.log("brown: ", response2.data.results)
      });
  }, []);


  const createEndpointUrl = (pageID) =>
    `${ORIGINAL_COLLEGE_API_URL}page=${pageID}&api_key=${apiKey}`;

  useEffect(() => {
    if (
      // unnecessary once we require login for this page
      userLoginInfo.firstName != ""
    ) {
      axios.get(createEndpointUrl(pageID)).then((response) => {
        setCollegeList((prevList) => [...prevList, ...response?.data.results]);
      });
    }
  }, [pageID]);

  function incrementPage(event) {
    setPageID((pageID) => pageID + 1);
    event.preventDefault()
  }

  console.log("my colleges: ", collegeList);

  return (
    <div className="college-grid">
      <div className="content">
        <h1> Hi, ___, here are your personalized colleges! </h1>
        <div className="colleges">
          {collegeList?.map((college, index) =>
            Math.abs(
              Object.values(
                college.latest.admissions.sat_scores.midpoint
              ).reduce((total, score) => total + score, 0) - userScores.satScore
            ) <= 200 
            ||
            (college.latest.admissions.act_scores.cumulative
              ? Math.abs(
                  college.latest.admissions.act_scores.cumulative -
                    userScores.actScore
                ) <= 4
              : null) 
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
              ? (
              <CollegeCard college={college.latest} key={index} />
            ) : null
          )}
        </div>
        <button onClick={incrementPage} value={pageID}>
          See More Colleges
        </button>
      </div>
    </div>
  );
}
