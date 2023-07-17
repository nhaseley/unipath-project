import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegesPage.css";
import axios from "axios";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";

export default function CollegesPage({ userLoginInfo,  userScores, collegeList, setCollegeList }) {
  return(
    <div className="colleges-page">
      <FilterSidebar userLoginInfo={userLoginInfo} collegeList={collegeList} setCollegeList={setCollegeList} ></FilterSidebar>

      <CollegeGrid userLoginInfo={userLoginInfo}  userScores={userScores} collegeList={collegeList} setCollegeList={setCollegeList}></CollegeGrid>
    </div>
  );
}
