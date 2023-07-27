import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn, logoutUser }) {
  return (
    <>
      <div className="wholeNavbar">
        <h1 className="logo">
          <Link to={"/"}>uniF</Link>{" "}
        </h1>
        {userLoggedIn ? (
          <ul className="navItems">
            <li>
              <Link to={"/about"}>
                <button className="navButton"> About us </button>
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
