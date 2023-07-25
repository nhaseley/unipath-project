import * as React from "react";
import "./CollegesPage.css";
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
  userType
}) {
  return (
    <div className="colleges-page">
      {!userLoggedIn || userType != "student" ? (
        <h1> Unfortunately, this page is only available for students. Please log in <Link to={"/login"}>here.</Link> </h1>
      ) : (
        <>
          <FilterSidebar userLoginInfo={userLoginInfo} collegeList={collegeList} setCollegeList={setCollegeList}></FilterSidebar>

          <CollegeGrid
            userLoginInfo={userLoginInfo}
            collegeList={collegeList}
            setCollegeList={setCollegeList}
            collegeArrayPointer={collegeArrayPointer}
            setCollegeArrayPointer={setCollegeArrayPointer}
          ></CollegeGrid>
        </>
      )}
    </div>
  );
}
