import * as React from "react";
import { useEffect, useState } from "react";
import "./ParentsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ParentsPage({userLoginInfo, userLoggedIn}){
    return (
        <h1>
        Welcome, {userLoginInfo.firstName} to the parents page!
        </h1>
    )
}