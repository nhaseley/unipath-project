import * as React from "react";
import { useEffect, useState } from "react";
import "./AlumniHomePage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AlumniHomePage({userLoginInfo, userLoggedIn}){
    return (
        <h1>
        Welcome to {userLoginInfo?.college}, {userLoginInfo?.firstName}!
        </h1>
    )
}