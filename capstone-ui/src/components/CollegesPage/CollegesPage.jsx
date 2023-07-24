import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegesPage.css";
import axios from "axios";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";

export default function CollegesPage({
  userLoginInfo,
  collegeList,
  setCollegeList,
  userLoggedIn,
  collegeArrayPointer,
  setCollegeArrayPointer
}) {
  return (
    <div className="colleges-page">
      {!userLoggedIn ? (
        <h1>Please log in. </h1>
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
