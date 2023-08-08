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
  scrollToTop
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
        </div>
      ) : (
        <div className="parent-logged-in-page">
          {userType == "parent" || userType == "student" ? (
            <h1 style={{fontWeight: "normal"}}> Welcome, {userLoginInfo?.firstName} to the parents page! </h1>
          ) : null}
          <h2>
            On this page, you can view financial breakdown information for your {userType == "parent" ? "child's" : null} liked colleges. For more information, click on the college name.
          </h2>

          {childsColleges?.map((childCollege, i) => (
            <>
              <hr className="parent-card-break"
              />
              <ParentCollegeCard
                childCollege={childCollege}
                key={i}
                setUserLoginInfo={setUserLoginInfo}
                customColors={customColors}
                scrollToTop={scrollToTop}
              ></ParentCollegeCard>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
