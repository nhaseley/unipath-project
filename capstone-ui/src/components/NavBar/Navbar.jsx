import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn }) {
  return (
    <>
      {userLoggedIn ? (
        <div className="wholeNavbar">
          {" "}
          <Link to={"/"}>
            <h1 className="logo"> College Navigator </h1>
          </Link>
          <ul className="navItems">
            <li>
              <button>
                {" "}
                <Link to={"/about"}> About us </Link>{" "}
              </button>
            </li>
            <li>
              <button>
                {" "}
                <Link to={"/"}> Sign Out </Link>{" "}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="wholeNavbar">
          {" "}
          <Link to={"/"}>
            <h1 className="logo"> College Navigator </h1>
          </Link>
          <ul className="navItems">
            <li>
              <button>
                {" "}
                <Link to={"/about"}> About us </Link>{" "}
              </button>
            </li>
            <li>
              <button>
                {" "}
                <Link to={"/register"}> Register here </Link>{" "}
              </button>
            </li>
            <li>
              <button>
                {" "}
                <Link to={"/login"}> Login here </Link>{" "}
              </button>
            </li>
          </ul>
        </div>
      )}

      <Outlet />
    </>
  );
}
