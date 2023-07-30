import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NetPricePieChart from "./NetPriceBarChart";
import AverageEarningsBarChart from "./AverageEarningsBarChart";
import FamilyIncomeBarChart from "./FamilyIncomeBarChart";

export default function ParentCollegeCard({ childCollege, setUserLoginInfo, customColors }) {
  const [college, setCollege] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3010/info/" + `${childCollege?.name}`, {
        id: childCollege?.name,
      })
      .then((response) => {
        setCollege(response.data);
      });
  }, []);

  const netPriceData = {
    net_price_0_30000: college?.net_price_0_30000,
    net_price_30001_48000: college?.net_price_30001_48000,
    net_price_48001_75000: college?.net_price_48001_75000,
    net_price_75001_111000: college?.net_price_75001_111000,
  };
  const averageEarningsData = {
    earnings_1yr_after_completion: college?.earnings_1yr_after_completion,
    earnings_4yr_after_completion: college?.earnings_4yr_after_completion,
  };

  const incomeData = {
    median_family_income: parseFloat(college?.median_family_income),
    average_family_income: parseFloat(college?.avg_family_income)
  };

  function changeCollege(){
    setUserLoginInfo((u) => ({ ...u, college: childCollege?.name }));
  }
  
  return (
    <div className="parent-college-card">
      <div className="info">
        <h2 className="student-college-name" onClick={changeCollege}><Link to={"/info/" + childCollege?.name} > {childCollege?.name} </Link></h2>
        <h3 className="out-of-state-tuition">
          Out of State Tuition:{" "}
          {college?.tuition_out_of_state? "$" + parseInt(college?.tuition_out_of_state).toLocaleString(): "Unavailable"}
        </h3>
        <h3 className="in-state-tuition">
          In-State Tuition: {" "}
          {college?.tuition_in_state? "$" + parseInt(college?.tuition_out_of_state).toLocaleString(): "Unavailable"}
        </h3>
        <h3 className="room-and-board">
          Room and board: {" "}
          {college?.room_board_offcampus ? "$" + parseInt(college?.room_board_offcampus).toLocaleString(): "Unavailable"}
        </h3>
        <h3>
          
        </h3>
      </div>
      {/* <div className="parent-data-visuals"> */}
      {college?.tuition_out_of_state ? (
        <div className="net-price-bar-chart">
          <NetPricePieChart
            netPriceData={netPriceData}
            customColors={customColors}
          ></NetPricePieChart>
        </div>
      ) : <h2 className="no-tuition-info">Tuition information not available</h2>}

      <div className="average-earnings-bar-chart">
        <AverageEarningsBarChart
          averageEarningsData={averageEarningsData}
          customColors={customColors}
        ></AverageEarningsBarChart>
      </div>

      <div className="family-income-bar-chart">
          <FamilyIncomeBarChart
            incomeData={incomeData}
            customColors={customColors}
          ></FamilyIncomeBarChart>
        </div>
{/* </div> */}
    </div>
  );
}
