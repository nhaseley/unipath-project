import * as React from "react";
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <div className="subHero">
        <div className="textInfo">
          <h1 className="textHeader">Welcome to The College Navigator</h1>
          <h2 className="textHeader2">
            Finding the right college for you!
          </h2>
        </div>

        <div className="watchImage">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-0StNGIFVb1NJpyfRBcffyTnXE4vspht7g&usqp=CAU"
            alt="diversityImg"
            className="pageImg"
          />
        </div>


  <div className="biography">
        <h1> This is CollegeNavigator </h1>
        <p>
          {" "}
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim. Headie One is the Best. Ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam,
        </p>
      </div>


      </div>
    
    
  
    </>
  );
}
