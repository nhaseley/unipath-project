import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar({ userLoggedIn}) {

  return (
    <>
      <div> navbar</div>

      {userLoggedIn ? (
         <div className="wholeNavbar">
          <span>LOGO</span>

          <button> <Link to={"/about"}> About us </Link> </button>

        <button> <Link to={"/"}> Sign Out </Link> </button>
        </div>
      ) : (

        <div className="wholeNavbar">
          <span>LOGO</span>
          <button> <Link to={"/about"}> About us </Link> </button>
          <button> <Link to={"/register"}> Register here </Link> </button>
          <button> <Link to={"/login"}> Login here </Link> </button>
        </div>
      )}

      <Outlet />
    </>
  );
}
