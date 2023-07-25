import * as React from "react";
import { useEffect, useState } from "react";
import "./EventsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventsPage({userLoginInfo, userLoggedIn}){
    return (
        <h1>
        Welcome, {userLoginInfo?.firstName} to the events page!
        </h1>
    )
}