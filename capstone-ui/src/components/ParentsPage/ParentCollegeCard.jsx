import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NetPricePieChart from "./NetPricePieChart"

export default function ParentCollegeCard({ childCollege }) {
  const [college, setCollege] = useState();

  console.log("college", college);
  useEffect(() => {
    axios
      .post("http://localhost:3010/info/" + `${childCollege?.name}`, {
        id: childCollege?.name,
      })
      .then((response) => {
        setCollege(response.data);
      });
  }, []);

  const data = {
    net_price_0_30000: college?.net_price_0_30000,
    net_price_30001_48000: college?.net_price_30001_48000,
    net_price_48001_75000: college?.net_price_48001_75000,
    net_price_75001_111000: college?.net_price_75001_111000,
  };

  return (
    <div className="parent-college-card">
      <h2>{childCollege?.name}</h2>
      <h3 className="tuition-information">
        Out of state tuition: ${parseInt(college?.tuition_out_of_state).toLocaleString()}
      </h3>
      <h3> In state tuition: ${parseInt(college?.tuition_in_state).toLocaleString()}</h3>
      <div>
        Net Price Breakdown:
        <h3>$0 - $30,000: ${parseInt(college?.net_price_0_30000).toLocaleString()}</h3>
        <h3>$30,001 - $48,000: ${parseInt(college?.net_price_30001_48000).toLocaleString()}</h3>
        <h3>$48,001 - $75,000: ${parseInt(college?.net_price_48001_75000).toLocaleString()}</h3>
        <h3>$75,001 - $111,000: ${parseInt(college?.net_price_75001_111000).toLocaleString()}</h3>
        <NetPricePieChart data={data} ></NetPricePieChart>
      </div>
      Average earnings{college?.earnings_1yr_after_completion}
    </div>
  );
}
