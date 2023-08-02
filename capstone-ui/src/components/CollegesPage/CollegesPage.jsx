import * as React from "react";
import "./CollegesPage.css";
import { useEffect, useState } from "react";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import { Link } from "react-router-dom";

export default function CollegesPage({
  userLoginInfo,
  setUserLoginInfo,
  collegeList,
  setCollegeList,
  collegeArrayPointer,
  setCollegeArrayPointer,
  userType,
  convertCollegeSAT
}) {
  const [collegesToDisplay, setCollegesToDisplay] = useState(collegeList);

  return (
    <div className="colleges-page">

  
      {userType != "student" ? (
        <h1>
          Unfortunately, this page is for students only. Please log in{" "}
          <Link to={"/login"}>here.</Link>{" "}
          {/* TODO: onclick change usertype? */}
        </h1>
      ) : (
        <>
          <FilterSidebar
            userLoginInfo={userLoginInfo}
            collegeList={collegeList}
            setCollegesToDisplay={setCollegesToDisplay}
            convertCollegeSAT={convertCollegeSAT}
          ></FilterSidebar>

          <CollegeGrid
            userLoginInfo={userLoginInfo}
            setUserLoginInfo={setUserLoginInfo}
            setCollegeList={setCollegeList}
            collegeArrayPointer={collegeArrayPointer}
            setCollegeArrayPointer={setCollegeArrayPointer}
            collegesToDisplay={collegesToDisplay}
            setCollegesToDisplay={setCollegesToDisplay}
            convertCollegeSAT={convertCollegeSAT}
          ></CollegeGrid>
        </>
      )}
    </div>
  );
}
