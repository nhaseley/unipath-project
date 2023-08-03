import * as React from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn, logoutUser }) {
  return (
    <>
      <div className="wholeNavbar">
        <h1 className="logo">
          <Link to={"/"}>UniPath</Link>
        </h1>
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
              <a
                className="about_link"
                style={{ scrollBehavior: "smooth" }}
                href="#biography"
                // Adjust this value to fine-tune the scroll position if necessary
                duration={500} // Duration of the smooth scroll animation in milliseconds
              >
                About Us
              </a>
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
