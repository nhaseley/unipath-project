import * as React from "react";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";

export default function FilterSidebar({
  userLoginInfo,
  collegeList,
  setCollegesToDisplay,
  convertCollegeSAT
}) {
  const [price, setPrice] = useState(30000);
  const [sat, setSAT] = useState(userLoginInfo.satScore);
  const [act, setACT] = useState(userLoginInfo.actScore);
  const [enrollment, setEnrollment] = useState(userLoginInfo.enrollment);

  const [filteredBySAT, setFilteredBySAT] = useState([]);
  const [filteredByACT, setFilteredByACT] = useState([]);
  const [filteredByEnrollment, setFilteredByEnrollment] = useState([]);
  const [filteredByPrice, setFilteredByPrice] = useState([]);

  useEffect(() => {
    setSAT(userLoginInfo.satScore);
    setACT(userLoginInfo.actScore);
    setEnrollment(userLoginInfo.enrollment);
  }, [userLoginInfo]);



  function changePriceFilter(event) {
    setPrice(event.target.value);
    let priceFiltered = collegeList.filter(
      (college) =>
        Math.abs(parseFloat(college.tuition_out_of_state) - event.target.value) <= 5000
    ).sort((a, b) => parseFloat(b.tuition_out_of_state) - parseFloat(a.tuition_out_of_state));
    setFilteredByPrice(priceFiltered);
    console.log(priceFiltered)
    if (
      filteredBySAT.length != 0 &&
      filteredByACT.length != 0 &&
      filteredByEnrollment.length != 0
    ) {
      const commonItems = filteredBySAT
        .filter((item) => priceFiltered.includes(item))
        .filter((item) => filteredByACT.includes(item))
        .filter((item) => filteredByEnrollment.includes(item))
        .sort((a, b) => parseInt(b.size) - parseInt(a.size));

      setCollegesToDisplay(commonItems);
    } else {
      setCollegesToDisplay(priceFiltered);
    }
  }
  
  /////////////////////////////////////////////////////////////////
  
  async function handleChangeSAT(college, sat){
    let convertedSAT = await convertCollegeSAT(`${parseInt(college.sat_score_critical_reading) +
      parseInt(college.sat_score_writing) +
      parseInt(college.sat_score_math)}`);
      return (Math.abs(convertedSAT - sat) <= 300)
  }
  
  async function changeSATFilter(event) {
    setSAT(event.target.value);
    // Use Promise.all to filter the collegeList asynchronously
    const filteredIndexes = await Promise.all(
      collegeList.map((college) => handleChangeSAT(college, sat))
    );
  
    // Create a filtered list based on the resolved values
    const satFiltered = collegeList.filter((_, index) => filteredIndexes[index]);
    console.log("FILTERED BY SAT", satFiltered.length);

    setFilteredBySAT(satFiltered);

    if (filteredByACT.length != 0 && filteredByPrice.length != 0 &&
      filteredByEnrollment.length != 0) {
      const commonItems = satFiltered.filter((item) =>
        filteredByACT.includes(item)).filter((item) => filteredByPrice.includes(item))
        .filter((item) => filteredByEnrollment.includes(item));
      setCollegesToDisplay(commonItems);
    } else {
      setCollegesToDisplay(satFiltered);
    }
  }



  /////////////////////////////////////////////////////////////////
  function changeACTFilter(event) {
    setACT(event.target.value);
    let actFiltered = collegeList.filter((college) =>
      college.act_score
        ? Math.abs(parseInt(college.act_score - event.target.value)) <= 5
        : null
    );
    setFilteredByACT(
      actFiltered.sort((a, b) => parseInt(b.act_score) - parseInt(a.act_score))
    );

    if (filteredBySAT.length != 0 && filteredByPrice.length != 0 &&
      filteredByEnrollment.length != 0) {
      const commonItems = filteredBySAT
        .filter((item) => actFiltered.includes(item))
        .filter((item) => filteredByPrice.includes(item))
        .filter((item) => filteredByEnrollment.includes(item))
        .sort((a, b) => parseInt(b.act_score) - parseInt(a.act_score));

      setCollegesToDisplay(commonItems);
    } else {
      setCollegesToDisplay(actFiltered);
    }
  }

  function changeEnrollmentFilter(event) {
    setEnrollment(event.target.value);
    let enrollmentFiltered = collegeList
      .filter((college) => parseInt(college.size) < event.target.value)
      .sort((a, b) => parseInt(b.size) - parseInt(a.size));

    setFilteredByEnrollment(enrollmentFiltered);

    if (filteredBySAT.length != 0 && filteredByACT.length != 0 && filteredByPrice.length != 0 ) {
      const commonItems = filteredBySAT
        .filter((item) => enrollmentFiltered.includes(item))
        .filter((item) => filteredByACT.includes(item))
        .filter((item) => filteredByPrice.includes(item))
        .sort((a, b) => parseInt(b.size) - parseInt(a.size));

      setCollegesToDisplay(commonItems);
    } else {
      setCollegesToDisplay(enrollmentFiltered);
    }
  }

  return (
    <div className="filter-sidebar">
      <div className="filters">
        <div className="user-info">
          <div>Your SAT Score: {userLoginInfo.satScore}</div>
          <div>Your ACT Score: {userLoginInfo.actScore}</div>
        </div>
        <div className="price-filter">Tuition: ${parseInt(price).toLocaleString()}</div>
        <input
          className="price-slider"
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={price.toLocaleString()}
          onChange={changePriceFilter}
        ></input>
        <div className="act-score">ACT: {act ? act : null}</div>
        <input
          className="act-slider"
          type="range"
          min={0}
          max={36}
          step={1}
          value={act}
          onChange={changeACTFilter}
        ></input>
        <div className="sat-score">SAT: {sat ? sat : null}</div>
        <input
          className="sat-slider"
          type="range"
          min={400}
          max={1600}
          step={10}
          value={sat}
          onChange={changeSATFilter}
        ></input>
        <div className="enrollment">
          Enrollment Size: {enrollment?.toLocaleString()}
        </div>
        <>
          <input
            className="enrollment-slider"
            type="range"
            min={0}
            max={80000}
            step={1000}
            value={enrollment}
            onChange={changeEnrollmentFilter}
          ></input>
        </>
      </div>
    </div>
  );
}
