import * as React from "react";
import "./CollegesPage.css";
import { useEffect, useState } from "react";
import CollegeGrid from "./CollegeGrid/CollegeGrid";
import FilterSidebar from "./FilterSidebar/FilterSidebar";
import { Link } from "react-router-dom";

export default function CollegesPage({
  userLoginInfo,
  setUserLoginInfo,
  userLoggedIn,
  collegeList,
  setCollegeList,
  collegeArrayPointer,
  setCollegeArrayPointer,
  userType,
  setUserType,
  convertCollegeSAT
}) {
  const [collegesToDisplay, setCollegesToDisplay] = useState(collegeList);

  return (
    <div className="colleges-page">

  
      {userType != "student" || !userLoggedIn ? (
         <div className="invalid-user">
          <h1 className="unfortunate"> Unfortunately, this page is for students only.
          Please log in </h1>
          <button className="incorrect-user-type-button" onClick={() => setUserType("student")}>
            <Link to={"/login"}> here. </Link>
          </button>
         </div>
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
