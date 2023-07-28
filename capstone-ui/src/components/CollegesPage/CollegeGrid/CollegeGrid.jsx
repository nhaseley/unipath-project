import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollegeCard from "../CollegeCard/CollegeCard";

export default function CollegeGrid({
  userLoginInfo,
  setCollegeList,
  collegeArrayPointer,
  setCollegeArrayPointer,
  collegesToDisplay,
  setCollegesToDisplay,
  setUserLoginInfo,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [allColleges, setAllColleges] = useState([]);
  const [searchedColleges, setSearchedColleges] = useState([]);

  // Function to display colleges on the grid
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
          console.log(
            "colleges for this user: ",
            response.data.collegesToDisplay
          );
          // setCollegeList((prevList) => [...prevList, ...response?.data]);
          setCollegeList(response?.data.collegesToDisplay);
          setCollegesToDisplay(response?.data.collegesToDisplay);
          setAllColleges(response?.data.allColleges);
        });
    }
  }

  // UseEffect to display colleges on the grid
  useEffect(() => {
    getCollegeGrid();
  }, [userLoginInfo, collegeArrayPointer]);

  function incrementPage() {
    setCollegeArrayPointer(collegeArrayPointer + 20);
  }
  // function decrementPage() {
  //   setCollegeArrayPointer(collegeArrayPointer - 20);
  // }

  //  Render each keystroke and filter collegeList with it
  function handleSearch(event) {
    setSearchInput(event.target.value);

    let filteredItems = allColleges?.filter((college) =>
      college.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log("filtered: ", filteredItems);
    setSearchedColleges(filteredItems);
  }

  let first20Colleges =
    searchInput != ""
      ? searchedColleges.slice(collegeArrayPointer, collegeArrayPointer + 20)
      : collegesToDisplay.slice(collegeArrayPointer, collegeArrayPointer + 20);

  console.log(first20Colleges);

  return (
    <div className="college-grid">
        <h1>
          Hi {userLoginInfo.firstName != "" ? userLoginInfo.firstName : null},
          here are your personalized colleges!
        </h1>
        <label>Search College   </label>
          <input
            className="college-search"
            label="Search"
            onChange={handleSearch}
            placeholder="Search for a college here"
          ></input>
        <div className="colleges">
          {first20Colleges?.map((college, index) => (
            <CollegeCard
              college={college}
              key={index}
              setUserLoginInfo={setUserLoginInfo}
            />
          ))}
          {/* change functionality to be able to back to previous colleges */}
        </div>
        <button onClick={incrementPage}>See More Colleges</button>
        {/* <button onClick={decrementPage}>Previous Colleges</button> */}
    </div>
  );
}
