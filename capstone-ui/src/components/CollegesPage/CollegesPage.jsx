import * as React from "react";
import "./CollegesPage.css";
import { useEffect, useState } from "react";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import { Link } from "react-router-dom";

export default function CollegesPage({
  userLoginInfo,
  collegeList,
  setCollegeList,
  userLoggedIn,
  collegeArrayPointer,
  setCollegeArrayPointer,
  userType,
}) {
  const [collegesToDisplay, setCollegesToDisplay] = useState(collegeList);

  return (
    <div className="colleges-page">
      {!userLoggedIn && userType != "student" ? (
        <h1>
          Unfortunately, this page is only available for students. Please log in{" "}
          <Link to={"/login"}>here.</Link>{" "}
        </h1>
      ) : (
        <>
          <FilterSidebar
            userLoginInfo={userLoginInfo}
            collegeList={collegeList}
            setCollegeList={setCollegeList}
            collegesToDisplay={collegesToDisplay}
            setCollegesToDisplay={setCollegesToDisplay}
          ></FilterSidebar>

          <CollegeGrid
            userLoginInfo={userLoginInfo}
            collegeList={collegeList}
            setCollegeList={setCollegeList}
            collegeArrayPointer={collegeArrayPointer}
            setCollegeArrayPointer={setCollegeArrayPointer}
            collegesToDisplay={collegesToDisplay}
          ></CollegeGrid>
        </>
      )}
    </div>
  );
}
