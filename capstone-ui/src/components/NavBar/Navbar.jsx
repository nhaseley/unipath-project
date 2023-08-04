import * as React from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";
import mainLogo from "./Untitled_Artwork.png";

export default function Navbar({ userLoggedIn, logoutUser }) {
  return (
    <>
      <div className="wholeNavbar">
        {/* <h1 className="logo"> */}
        <div className="logo-container">
          <Link to={"/"}>
            <img src={mainLogo} className="logo_picture" />
          </Link>
        </div>
        {/* <Link to={"/"}>UniPath</Link> */}
        {/* </h1> */}
        {userLoggedIn ? (
          <ul className="navItems">
            <li>
              <Link to={"/feed"}>Search Colleges</Link>
            </li>
            <li>
              <Link to={"/like"}>Liked Colleges</Link>
            </li>
            <li>
              <Link to={"/child-feed"}>Parents</Link>
            </li>

            <li>
              <Link to={"/events"}>View Events</Link>
            </li>

            <li>
              <Link to={"/mycollege"}>Alumni and Students</Link>
            </li>
            <li>
              <Link to={"/"} onClick={logoutUser}>
                Sign Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navItems">
            <li>
              <Link to={"/about"}>About Us</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        )}
      </div>
      <Outlet />
    </>
  );
}
