import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeCard from "../CollegeCard/CollegeCard";

export default function CollegeGrid({userScores}) {
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

  function incrementPage(event) {
    setPageID(parseInt(event.target.value) + 1);
  }


useEffect(() => {
  // axios.post("http://localhost:3001/student")

})  
// axios
//         .post("http://localhost:3001/auth/follow", {
//           token: existingToken,
//           followed_id: event.target.value,
//         })
//         .then((users) => {
//           setUserFollowings(users.data);
//         });
// }

  return (
    <div className="college-grid">
      <div className="content">
        <h1> Your Personalized College Search!</h1>
        <div className="colleges">
          {collegeList?.map((college, index) =>
            ((Math.abs(
              Object.values(
                college.latest.admissions.sat_scores.midpoint
              ).reduce((total, score) => total + score, 0) - userScores.satScore
            ) <= 200 )
            ||
            (college.latest.admissions.act_scores.cumulative
              ? Math.abs(
                  college.latest.admissions.act_scores.cumulative - userScores.actScore
                ) <= 4
              : null)) ? (
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
