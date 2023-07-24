import * as React from "react";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";

export default function FilterSidebar({ userLoginInfo, collegeList, setCollegeList }) {
  const [price, setPrice] = useState(30000);
  const [sat, setSAT] = useState(userLoginInfo.satScore);
  const [act, setACT] = useState(userLoginInfo.actScore);
  const [enrollment, setEnrollment] = useState(userLoginInfo.enrollment);
  
  useEffect(() => {
    setSAT(userLoginInfo.satScore);
    setACT(userLoginInfo.actScore);
    setEnrollment(userLoginInfo.enrollment);
  }, [userLoginInfo]);

  function changePriceFilter(event) {
    setPrice(event.target.value);
    let filteredByPrice = collegeList.filter(
      (college) => parseFloat(college.tuition_out_of_state
        ) < event.target.value + 10000
    )
    filteredByPrice.length < collegeList.length ? setCollegeList(filteredByPrice) : null
    console.log("after changing price: ", filteredByPrice.length < collegeList.length ? filteredByPrice: collegeList)
        // need to change to only filter if less
  }
  function changeSATFilter(event) {
    setSAT(event.target.value);
    let filteredBySAT = collegeList.filter(
      (college) => Math.abs(parseInt(college.sat_score_critical_reading) + parseInt(college.sat_score_writing) + parseInt(college.sat_score_math)
        - event.target.value) >= 200
    )
    filteredBySAT.length < collegeList.length ? setCollegeList(filteredBySAT) : null
    console.log("after changing SAT: ", filteredBySAT.length < collegeList.length ? filteredBySAT: collegeList)
  }

  function changeACTFilter(event) {
    setACT(event.target.value);
    let filteredByACT = collegeList.filter(
      (college) => college.act_score ? Math.abs(parseInt(college.act_score - event.target.value)) >= 4 : null
    )
    filteredByACT.length < collegeList.length ? setCollegeList(filteredByACT) : null
    console.log("after changing ACT: ", filteredByACT.length < collegeList.length ? filteredByACT: collegeList)
  }
  function changeEnrollmentFilter(event) {
    setEnrollment(event.target.value);
    let filteredByEnrollment = collegeList.filter(
      (college) => parseInt(college.size) < event.target.value)
    filteredByEnrollment.length < collegeList.length ? setCollegeList(filteredByEnrollment) : null
    console.log("after changing ACT: ", filteredByEnrollment.length < collegeList.length ? filteredByEnrollment: collegeList)
  }
  
  return (
    <div className="filter-sidebar">
      <div className="filters">
        <div className="price-filter">Price: ${price.toLocaleString()}</div>
        <input
          className="price-slider"
          type="range"
          min={0}
          max={100000}
          step={1}
          value={price.toLocaleString()}
          // TODO: fix - not appearing as toLocaleString on slide
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
        <div className="enrollment">
          Enrollment Size: {enrollment.toLocaleString()}
        </div>
        <>
        <input
          className="enrollment-slider"
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={enrollment}
          onChange={changeEnrollmentFilter}
        ></input>
      </>
      </div>
    </div>
  );
}
