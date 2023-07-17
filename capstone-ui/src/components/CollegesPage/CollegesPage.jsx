import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegesPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";

export default function CollegesPage({ userLoginInfo,  userScores }) {
  console.log(userLoginInfo)
  return(
    <div className="colleges-page">
      <FilterSidebar></FilterSidebar>

      <CollegeGrid userLoginInfo={userLoginInfo}  userScores={userScores} ></CollegeGrid>
    </div>
  );
}
