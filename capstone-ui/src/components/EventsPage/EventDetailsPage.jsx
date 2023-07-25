import * as React from "react";
import { useEffect, useState } from "react";
import "./EventsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function () {
    const [eventInfo, setEventInfo] = useState({})

    const navigate = useNavigate()

    function handleEventSubmit (event) {
        event.preventDefault()

        navigate('/events')

    }
    
    
    return (
        <>
    <div>
        You can add a new Event Here        
    </div>   
    <div className="eventOuter">
        <form className="event-form">
            <div className="event-name">
                <label htmlFor="event-name-label" className="event-name-label">Event Name: </label>
                <input type="text" className="event-name-input" />
            </div>

            <div className="event-desc">
                <label htmlFor="event-desc-label" className="event-desc-label">Event Description:</label>
                <input type="text" className="event-desc-input" />
            </div>

            <div className="event-email">
                <label htmlFor="email-label" className="email-label">Email:</label>
                <input type="email" className="email-input"/>
            </div>

            <div className="event-date/time">
                <label htmlFor="event-date/time-label" className="event-date/time-label">Date/Time:</label>
                <input type="datetime-local" className="event-date/time-input"/>
            </div>

            <div className="event-speaker">
                <label htmlFor="event-speaker-label" className="event-speaker-label"> Speaker(s):</label>
                <input type="text" className="event-speaker-input"/>
            </div>

            <div className="event-dept">
                <label htmlFor="event-dept-label" className="event-dept-label">Dept:</label>
                <input type="text" className="event-dept-input"/>
            </div>

            <div className="event-max-registrants">
                <label htmlFor="event-max-registrants-label" className="event-max-registrants-label"> Max Registrants: </label>
                <input type="number" className="event-max-registrants-input" />
            </div>

            <button className="event-registration" onClick={handleEventSubmit}>  Submit </button>
        </form>
    </div>
</>
    )
}
