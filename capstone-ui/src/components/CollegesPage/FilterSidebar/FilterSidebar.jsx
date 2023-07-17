import * as React from "react";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";

export default function FilterSidebar({userLoginInfo, collegeList, setCollegeList}) {
  const [sat, setSAT] = useState(userLoginInfo.satScore);
  const [act, setACT] = useState(userLoginInfo.actScore);
  const [price, setPrice] = useState(30000);  
  const [enrollment, setEnrollment] = useState(userLoginInfo.enrollment);
  function changeSATFilter(event) {
    setSAT(event.target.value);
  }

  function changeACTFilter(event) {
    setACT(event.target.value);
  }
  function changePriceFilter(event) {
    setPrice(event.target.value);
  }

  function changeEnrollmentFilter(event) {
    setEnrollment(event.target.value);
  }
  return (
    <div className="filter-sidebar">
      <div className="price-filter">Price: {price}</div>
      <input
        className="price-slider"
        type="range"
        min={0}
        max={36}
        step={1}
        value={price}
        onChange={changePriceFilter}
      ></input>
      <div className="act-score">ACT: {act}</div>
      <input
        className="act-slider"
        type="range"
        min={0}
        max={36}
        step={1}
        value={act}
        onChange={changeACTFilter}
      ></input>
      <div className="sat-score">SAT: {sat}</div>
      <input
        className="sat-slider"
        type="range"
        min={0}
        max={2400}
        step={10}
        value={sat}
        onChange={changeSATFilter}
      ></input>
      <div className="enrollment">Enrollment Size: {enrollment}</div>
      <input
        className="enrollment-slider"
        type="range"
        min={0}
        max={100000}
        step={1000}
        value={enrollment}
        onChange={changeEnrollmentFilter}
      ></input>
    </div>
  );
}
