import * as React from "react";
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <div className="subHero">
        <div className="textInfo">
          <h1 className="textHeader">Welcome to Uniforce!</h1>
          <h2 className="textHeader2">
            Helping you find the right college for you.
          </h2>
        </div>

        <div> hi</div>
        <div className="watchImage">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-0StNGIFVb1NJpyfRBcffyTnXE4vspht7g&usqp=CAU"
            alt="diversityImg"
            className="pageImg"
          />
        </div>
      </div>
    </>
  );
}
