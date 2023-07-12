import * as React from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div> navbar</div>
      <button>
        <Link to={"/register"}> Register here </Link>
        
      </button>

      <button> Hello world</button>
      <button>
        <Link to={"/login"}> Login here </Link>
      </button>

      <Outlet />
    </>
  );
}
