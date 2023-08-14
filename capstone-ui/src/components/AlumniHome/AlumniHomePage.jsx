import * as React from "react";
import { useState } from "react";
import "./AlumniHomePage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

export default function AlumniHomePage({
  userLoginInfo,
  setUserLoginInfo,
  userLoggedIn,
  setError,
  userType,
  setUserType
}) {
  const navigate = useNavigate();
  const [ratingNumber, setRatingNumber] = useState();
  const [additionalReview, setAdditionalReview] = useState("");

  function handleDemo() {
    setRatingNumber(5);
    setAdditionalReview("This school is the best!");
    setUserLoginInfo({
      ...userLoginInfo,
      email: "nylevenya@brown.edu",
      firstName: "nya",
      lastName: "haseley-ayende",
      ratingNumber: 5,
      additionalReview: "This school is the best!",
    });
  }

  const ratings = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  function handleRatingSelect(event) {
    setRatingNumber(event.value);
    setUserLoginInfo({
      ...userLoginInfo,
      ratingNumber: event.value,
    });
  }

  function handleAdditionalInfo(event) {
    setAdditionalReview(event.target.value);
    setUserLoginInfo({
      ...userLoginInfo,
      additionalReview: event.target.value,
    });
  }
  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  async function handleReviewSubmit(event) {
    event.preventDefault();


    let result = await axios.post(BASE_URL+ "/postCollegeReview", {
      alumId: userLoginInfo.id,
      alumFirstName: userLoginInfo.firstName,
      alumLastName: userLoginInfo.lastName,
      collegeName: userLoginInfo.collegeName,
      collegeGradYear: userLoginInfo.collegeGradYear,
      rating: userLoginInfo.ratingNumber,
      review: userLoginInfo.additionalReview,
    });

    if (result.data.status) {
      setError(result.data);
    } else {
      setUserLoginInfo({
        ...userLoginInfo,
        ratingNumber: "",
        additionalReview: "",
      });
      navigate("/info/" + userLoginInfo?.collegeName);
      setError({});
    }
  }

  return (
    <div className="alumni-home-page">

      {userType != "college-students-and-alumni" || !userLoggedIn ? (
        <div className="invalid-user">
          <h1 className="unfortunate"> Unfortunately, this page is for college students and alumni only.
          Please log in </h1>
          <button className="incorrect-user-type-button" onClick={() => setUserType("college-students-and-alumni")}>
            <Link to={"/login"}> here. </Link>
          </button>
        </div>

      ) : (
        <div className="alumni-logged-in-page">
          
          <div className="alumni-header">
            <h1 style={{fontWeight: "normal"}}>
              Welcome to {userLoginInfo.collegeName}, {userLoginInfo?.firstName}
              !
            </h1>
            <div className="alumni-view-college">
            <button className="alumni-college-button">
              <Link
                to={"/info/" + userLoginInfo.collegeName}
                className="college-link"
              >
                View Your College
              </Link>
            </button>
            </div>
          </div>
          <h2>
            You can post reviews/ratings for your college to help applicants
            find the school that fits best for them!
          </h2>

          <div className="review-for-alum">
            <h2 style={{marginBottom: "0.5vh"}}>Write your Review Here</h2>
            <form className="review-form">
              <div className="names">
                <div className="first-name">
                  <input
                    className="first-name-input"
                    type="text"
                    placeholder="First Name"
                    value={userLoginInfo.firstName}
                    onChange={(e) =>
                      setUserLoginInfo((u) => ({
                        ...u,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="last-name">
                  <input
                    className="last-name-input"
                    type="text"
                    placeholder="Last Name"
                    value={userLoginInfo.lastName}
                    onChange={(e) =>
                      setUserLoginInfo((u) => ({
                        ...u,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="email">
                {/* <img
                  src="https://www.transparentpng.com/download/send-email-button/DyZNCL-send-email-button-free-download-transparent.png"
                  className="email-img"
                ></img> */}
                <input
                  className="email-input"
                  type="email"
                  placeholder="Email"
                  value={userLoginInfo.email}
                  onChange={(e) =>
                    setUserLoginInfo((u) => ({ ...u, email: e.target.value }))
                  }
                ></input>
              </div>

              <div className="rate-your-school">
                Rate your school out of 5 stars where 0 is terrible and 5 is
                amazing!
                <Select
                  options={ratings}
                  onChange={handleRatingSelect}
                  value={ratings.find(
                    (option) => option.value === ratingNumber
                  )}
                  placeholder="Your rating here"
                ></Select>
              </div>

              <div className="additional-reviews">
                <textarea
                  className="additional-text"
                  value={additionalReview}
                  placeholder="Write your additional comments here"
                  onChange={handleAdditionalInfo}
                />
              </div>
            </form>
            <div className="review-buttons">
            {process.env.NODE_ENV === "development" ? 
            <button className="demo-button" onClick={handleDemo}>
              Demo Post Review
            </button> : null}
            
            <button className="review-submit" onClick={handleReviewSubmit}>
                Submit
            </button>
            </div>
          </div>
          {/* <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80">
          </img> */}
        </div>
      )}
    </div>
  );
}
