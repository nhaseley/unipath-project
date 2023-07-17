import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn, logoutUser }) {
  return (
    <>
      <div className="wholeNavbar">
        <h1 className="logo">
          <Link to={"/"}> College Navigator </Link>{" "}
        </h1>
        {userLoggedIn ? (
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
                <Link to={"/"} onClick={logoutUser}>
                  {" "}
                  Sign Out{" "}
                </Link>{" "}
              </button>
            </li>
          </ul>
        ) : (
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
        )}
      </div>
      <Outlet />
    </>
  );
}
