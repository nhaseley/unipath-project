import * as React from "react";
import { useEffect, useState } from "react";
import "./ParentsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ParentCollegeCard from "./ParentCollegeCard";

export default function ParentsPage({
  userLoginInfo,
  userType,
  setUserLoginInfo,
  customColors,
}) {
  const [childsColleges, setChildsColleges] = useState([]);

  useEffect(() => {
    if (userLoginInfo.parentPhone != "") {
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
      {userType != "parent" && userType != "student" ? (
        <h1>
          Unfortunately, this page is for parents only. Please log in{" "}
          <Link to={"/login"}> here. </Link>
        </h1>
      ) : (
        <div className="parent-logged-in-page">
          <h1>Welcome, {userLoginInfo?.firstName} to the parents page!</h1>
          <h1> Your {userType == "parent"?"child's": null} liked colleges: </h1>

          {childsColleges?.map((childCollege, index) => (
            <>
              <hr
                style={{
                  background: "green",
                  height: "5px",
                  border: "none",
                }}
              />
              <ParentCollegeCard
                childCollege={childCollege}
                key={index}
                setUserLoginInfo={setUserLoginInfo}
                customColors={customColors}
              ></ParentCollegeCard>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
