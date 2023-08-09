import React, { useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
import mainLogo from "./Untitled_Artwork.png";

export default function Navbar({ userLoggedIn, logoutUser, handleItemClick, getListItemStyle }) {


  return (
    <>
      <div className="wholeNavbar">
        <div className="logo-container">
          <Link to={"/"}>
            <img src={mainLogo} className="logo_picture" alt="Logo" />
          </Link>
        </div>
        <ul className="navItems">
          {userLoggedIn ? (
            <>
              <li onClick={() => handleItemClick("searchColleges")} style={getListItemStyle("searchColleges")}>
                <Link to={"/feed"}>Search Colleges</Link>
              </li>
              <li onClick={() => handleItemClick("likedColleges")} style={getListItemStyle("likedColleges")}>
                <Link to={"/like"}>Liked Colleges</Link>
              </li>
              <li onClick={() => handleItemClick("parents")} style={getListItemStyle("parents")}>
                <Link to={"/child-feed"}>Parents</Link>
              </li>
              <li onClick={() => handleItemClick("events")} style={getListItemStyle("events")}>
                <Link to={"/events"}>View Events</Link>
              </li>
              <li onClick={() => handleItemClick("alumni")} style={getListItemStyle("alumni")}>
                <Link to={"/mycollege"}>Alumni and Students</Link>
              </li>
              <li onClick={() => handleItemClick("signOut")} style={getListItemStyle("signOut")}>
                <Link to={"/"} onClick={logoutUser}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/about"} onClick={() => handleItemClick("about")} style={getListItemStyle("about")}>About Us</Link>
              </li>
              <li>
                <Link to={"/register"} onClick={() => handleItemClick("register")} style={getListItemStyle("register")}>Register</Link>
              </li>
              <li>
                <Link to={"/login"} onClick={() => handleItemClick("login")} style={getListItemStyle("login")} >Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}