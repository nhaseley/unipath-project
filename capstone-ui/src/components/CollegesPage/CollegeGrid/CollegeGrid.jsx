import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeCard from "../CollegeCard/CollegeCard";

export default function CollegeGrid() {
  const [pageID, setPageID] = useState(1);
  const [collegeList, setCollegeList] = useState([]);

  const apiKey = "AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF";
  const ORIGINAL_COLLEGE_API_URL =
    "https://api.data.gov/ed/collegescorecard/v1/schools?";
  // const brownUrl = `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=Brown-University&school.city=Providence&api_key=${apiKey}`;
  //   const createEndpointUrl = (schoolName, schoolCity) =>
  // `${ORIGINAL_COLLEGE_API_URL}&school.name=${schoolName}&school.city=${schoolCity}&api_key=${apiKey}`;

  const createEndpointUrl = (pageID) =>
    `${ORIGINAL_COLLEGE_API_URL}page=${pageID}&api_key=${apiKey}`;

  useEffect(() => {
    axios.get(createEndpointUrl(pageID)).then((response) => {
      setCollegeList(response.data.results);
    });
  }, [pageID]);

  console.log("colleges: ", collegeList);

  function incrementPage(event) {
    setPageID(parseInt(event.target.value) + 1);
  }

  return (
    <div className="college-grid">
      <div className="content">
        <h1> Your Personalized College Search!</h1>
        <div className="colleges">
          {collegeList?.map((college, index) =>
            Object.values(college.latest.admissions.sat_scores.midpoint).reduce(
              (total, score) => total + score,
              0
            ) ||
            Object.values(college.latest.admissions.act_scores.midpoint).reduce(
              (total, score) => total + score,
              0
            ) ? (
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
