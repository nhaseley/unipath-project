import * as React from "react";
import { useEffect, useState } from "react";
import "./AlumniHomePage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AlumniHomePage({ userLoginInfo, userLoggedIn }) {
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
    </div>
  );
}
