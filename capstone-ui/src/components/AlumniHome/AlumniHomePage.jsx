import * as React from "react";
import { useEffect, useState,  } from "react";
import "./AlumniHomePage.css";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

export default function AlumniHomePage({ userLoginInfo, setUserLoginInfo, setError, userLoggedIn }) {
  const navigate = useNavigate()
  const [ratingNumber, setRatingNumber] = useState({})
  const [additionalReview, setAdditionalReview] = useState('')

  const ratings = [
    { value: 0, label: '0'},
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
    { value: 4, label: '4'},
    { value: 5, label: '5'}
  ]

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
    })
  }

  // function handleReviewSubmit()

  async function handleReviewSubmit(event) {
    event.preventDefault();

      let result = await axios.post(
        "http://localhost:3010/postCollegeReview",
        {
          alumId: userLoginInfo.id,
          collegeName: userLoginInfo.college,
          rating: userLoginInfo.ratingNumber,
          review: userLoginInfo.additionalReview
        }

        
      )

      navigate("/info/" + userLoginInfo?.college);

      if (result.data.status) {
        setError(result.data);
      } else {
          const token = result.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
        setError({});
        setUserLoginInfo({
          email: "",
          firstName: "",
          lastName: "",
          parentPhone: "",
          zipcode: "",
          password: "",
          confirmPassword: "",
          examScores: {},
          enrollment: 0,
          schoolType: "",
          college: "",
          collegeGradYear: "",
        });
      }
    
  }



  return (
    <div className="alumni-home-page">
      <h1>
        Welcome to {userLoginInfo?.college}, {userLoginInfo?.firstName}!
      </h1>
      <Link to={"/info/" + userLoginInfo?.college} className="college-link">
        View your College
      </Link>
      <h2>
        You can post reviews/ratings for your college to help applicants find the school that fits best for them!
      </h2>


      <div className="review-for-alum">
            <h2>Write your Review Here</h2>
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
          <img
            src="https://www.transparentpng.com/download/send-email-button/DyZNCL-send-email-button-free-download-transparent.png"
            className="email-img"
          ></img>
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
          Rate your school out of 5 stars where 0 is terrible and 5 is amazing!
          <Select options={ratings} 
          onChange={handleRatingSelect}>
          </Select>
        </div>


        <div className="additional-reviews">
          {/* <input type="text-area" placeholder="Write you additional comments here"/> */}
          <textarea  className="additional-text" placeholder="Write your additional comments here"
          onChange={handleAdditionalInfo}/>
        </div>

        <button
        className="registration-submit"
        onClick={handleReviewSubmit}
      >
        <Link to={"/register/college-students-and-alumni"}> Submit</Link>
      </button>
            </form>


    </div>
    </div>
  );
}
