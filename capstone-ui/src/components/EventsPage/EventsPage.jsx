import * as React from "react";
import "./EventsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function EventsPage({userLoginInfo, userLoggedIn, userType}){
const navigate = useNavigate()

    function handleAddNewEvent(event) {
        event.preventDefault();

        navigate('/eventDetails') 
    }
    // useeffect to call all events with this college name

    return (
        <>
        <h1>
        Welcome, {userLoginInfo?.firstName} to the events page!
        </h1>

        {userType == "college-admission-officer" ? 
        (<button onClick={handleAddNewEvent}> Add a new Event</button>)
        :( <h1> Sorry, this page is for admission officers only. Please log in <Link to={"/login"}> here. </Link></h1>)}
        
        </>
    )
}

