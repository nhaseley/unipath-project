import * as React from "react";
import { useEffect, useState } from "react";
import "./ParentsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ParentCollegeCard from "./ParentCollegeCard";

export default function ParentsPage({ userLoginInfo, userLoggedIn }) {
  const [childsColleges, setChildsColleges] = useState([]);
  console.log("childs colleges: ", childsColleges)
  useEffect(() => {
    {
      axios
        .post("http://localhost:3010/getChildList", {
          parentPhone: userLoginInfo.parentPhone,
        })
        .then((response) => {
          setChildsColleges(response.data);
        });
    }
  }, [userLoginInfo]);

  return (
    <div className="parents-page">
      <h1>Welcome, {userLoginInfo.firstName} to the parents page!</h1>
      <h1> Your child's liked colleges: </h1>
      {childsColleges?.map((childCollege, index) => (
        <ParentCollegeCard childCollege={childCollege} key={index}></ParentCollegeCard>
      ))}
    </div>
  );
}
