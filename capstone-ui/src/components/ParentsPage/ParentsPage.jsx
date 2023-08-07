import * as React from "react";
import { useEffect, useState } from "react";
import "./ParentsPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ParentCollegeCard from "./ParentCollegeCard";

export default function ParentsPage({
  userLoginInfo,
  userLoggedIn,
  userType,
  setUserType,
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
      {(userType != "parent" && userType != "student") || !userLoggedIn ? (
        <div className="parent-please-log-in">
          <div className="invalid-user">
            <h1 className="unfortunate">
              Unfortunately, this page is for parents only. Please log in{" "}
            </h1>
            <button
              className="incorrect-user-type-button"
              onClick={() => setUserType("parent")}
            >
              <Link to={"/login"}> here. </Link>
            </button>
          </div>

          <img className="seatsCollegeImg" src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />

        </div>
      ) : (
        <div className="parent-logged-in-page">
          <img className="seatsCollegeImg" src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" />
          {userType == "parent" ? (
            <h1> Welcome, {userLoginInfo?.firstName} to the parents page! </h1>
          ) : null}
          <h1>
            {" "}
            {/* Your {userType == "parent" ? "child's" : null} liked colleges:{" "} */}
          </h1>

          {childsColleges?.map((childCollege, i) => (
            <>
              <hr className="parent-card-break"
              />
              <ParentCollegeCard
                childCollege={childCollege}
                key={i}
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
