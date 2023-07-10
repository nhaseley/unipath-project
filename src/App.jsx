import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App(){

    const apiKey="AiIF47OdjlHUb8m7mvs5k265lBQgGG9Hd5KXhBrF"
const url = `https://api.data.gov/ed/collegescorecard/v1/schools?school.name=Brown-University&school.city=Providence&api_key=${apiKey}`

useEffect(() => {
    axios.get(url).then((response) => {
      console.log("response: ", response.data.results[0]);
    });
  }, []);
return(

  <h1> This is CollegeNavigator </h1>
)
}