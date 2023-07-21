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
}) {
  return (
    <div className="colleges-page">
      {!userLoggedIn ? (
        <div>Please log in. </div>
      ) : (
        <>
          <FilterSidebar userLoginInfo={userLoginInfo}></FilterSidebar>

          <CollegeGrid
            userLoginInfo={userLoginInfo}
            collegeList={collegeList}
            setCollegeList={setCollegeList}
          ></CollegeGrid>
        </>
      )}
    </div>
  );
}
