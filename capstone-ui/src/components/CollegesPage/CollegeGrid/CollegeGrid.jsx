import * as React from "react";
import { useEffect, useState } from "react";
import "./CollegeGrid.css";
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
          schoolType: userLoginInfo.schoolType
        })
        .then((response) => {
          console.log(
            "colleges for this user: ",
            response.data.collegesToDisplay
          );
          setCollegeList(response?.data.collegesToDisplay);
          setCollegesToDisplay(response?.data.collegesToDisplay);
          setAllColleges(response?.data.allColleges);
        });
    }
  }

  // UseEffect to display colleges on the grid
  useEffect(() => {
    getCollegeGrid();
    scrollToTop();
  }, [userLoginInfo, collegeArrayPointer]);

  //  Render each keystroke and filter collegeList with it
  function handleSearch(event) {
    setCollegeArrayPointer(0)
    scrollToTop();
    setSearchInput(event.target.value);
    let filteredItems = allColleges?.filter((college) =>
    college.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    filteredItems.sort((a, b) => a.name.localeCompare(b.name))
    // console.log("filtered: ", filteredItems);
    setSearchedColleges(filteredItems);
  }

  function incrementPage() {
    setCollegeArrayPointer(collegeArrayPointer + 20);
    scrollToTop();
  }

  function decrementPage() {
    setCollegeArrayPointer(collegeArrayPointer - 20);
    scrollToTop();
  }


  function scrollToTop () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This creates a smooth scrolling effect
    });
  };

  // TODO: fix pagination logic for filtered - reverting to default
  let first20Colleges =
      searchInput != ""
        ? searchedColleges.slice(collegeArrayPointer, collegeArrayPointer + 20)
        : collegesToDisplay.slice(collegeArrayPointer, collegeArrayPointer + 20)

        console.log(first20Colleges);

  return (
    <div className="college-grid">
      <h1 className="personalizedGridHeader">
        Hi {userLoginInfo.firstName != "" ? userLoginInfo.firstName : null},
        here are your personalized colleges!
      </h1>
      <div className="searchThings">
        <label className="searchLabel"> Search All Colleges </label>
        <input
          className="college-search"
          label="Search"
          onChange={handleSearch}
          placeholder="Search for a college here"
        ></input>
      </div>
      <div className="colleges">
        {first20Colleges?.map((college, index) => (
          <CollegeCard
            key={index}
            college={college}
            setUserLoginInfo={setUserLoginInfo}
          />
        ))}
      </div>
      <div className="paginationButtons">
        <button className={`previousColleges ${collegeArrayPointer === 0 ? "disabled" : ""}`} onClick={() => {decrementPage()}} disabled={collegeArrayPointer === 0}>
          Previous Colleges</button>

        {first20Colleges.length != 0 ? (
        <button className={`seeMore ${collegeArrayPointer + 20 >= collegesToDisplay.length ? "disabled" : ""}`} onClick={() => {incrementPage()}} disabled={collegeArrayPointer + 20 >= collegesToDisplay.length}>
          See More Colleges
          </button>
        ) : null}
      </div>
    </div>
  );
}
