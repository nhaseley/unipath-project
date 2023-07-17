import * as React from "react";
import "./FilterSidebar.css";
import { useEffect, useState } from "react";


export default function FilterSidebar(){
    const [sat, setSAT] = useState(1440);
    function changeSATFilter(event){
        setSAT(event.target.value)
    }

    console.log(sat)
    return (
        <div className="filter-sidebar">

         <div className="price-filter">
            Price
      </div>
      
      <input
      className="sat-slider"
      type="range"
      min={0}
      max={2400}
      step={10}
      value={sat}
      onChange={changeSATFilter}
      ></input>
      
      
      

    </div>
    )
}
