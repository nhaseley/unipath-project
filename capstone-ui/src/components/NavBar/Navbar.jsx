import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn, logoutUser }) {
  return (
    <>
      <div className="wholeNavbar">
        <h1 className="logo">
          <Link to={"/"}> Uniforce </Link>{" "}
        </h1>
        {userLoggedIn ? (
          <ul className="navItems">

            <li>
              <Link to={"/feed"}>
                <button className="navButton"> Search Colleges </button>
              </Link>
            </li>

            <li>
              <Link to={"/like"}>
                <button className="navButton"> Liked Colleges</button>
              </Link>
            </li>

            <li>
              <Link to={"/child-feed"}>
                <button className="navButton"> Parents</button>
              </Link>
            </li>

            <li>
              <Link to={"/events"}>
                <button className="navButton"> View Events </button>
              </Link>
            </li>

            <li>
              <Link to={"/mycollege"}>
                <button className="navButton"> Alum and Students </button>
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={logoutUser}>
                <button className="navButton">Sign Out</button>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navItems">
            <li>
              <Link to={"/about"}>
                <button className="navButton">About Us </button>
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <button className="navButton"> Register </button>
              </Link>
            </li>
            <li>
              <Link to={"/login"}>
                <button className="navButton">Login </button>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <Outlet />
    </>
  );
}
