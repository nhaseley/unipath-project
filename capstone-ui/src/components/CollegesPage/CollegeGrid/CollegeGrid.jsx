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

  async function getCollegeGrid() {
    {
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
  }, [userLoginInfo]);

  function incrementPage(event) {
    setPageID((pageID) => pageID + 1);
    event.preventDefault();
  }
 
  return (
    <div className="college-grid">
      
      <div className="content">
        <h1>
          Hi {userLoginInfo.firstName != "" ? userLoginInfo.firstName : null},
          here are your personalized colleges!
        </h1>
        <div className="colleges">
          {collegeList?.map((college, index) => (
                <CollegeCard college={college} key={index} />
              ))
          }
        </div>
        <button onClick={incrementPage} value={pageID}>
          See More Colleges
        </button>
      </div>
    </div>
  );
}
