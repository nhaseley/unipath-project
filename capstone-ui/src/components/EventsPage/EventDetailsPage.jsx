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
    console.log(eventInfo)
    
    function handleDemo() {
        setEventInfo({
          name: "nya haseley-ayende",
          desc: "This is a really cool event!!",
          email: "nylevenya@brown.edu",
          speaker: "nya",
          dateTime: Date.now(),
          dept: "6464080591",
          maxRegistrants: 100
        });
      }
    


    return (
        <>
    <div>
        You can add a new Event Here        
    </div>   
    <div className="eventOuter">
        <form className="event-form">
            <div className="event-name">
                <label htmlFor="event-name-label" className="event-name-label" value={eventInfo.name} onChange={(e) =>
              setEventInfo((u) => ({ ...u, name: e.target.value }))
            }>Event Name: </label>
                <input type="text" className="event-name-input" />
            </div>

            <div className="event-desc">
                <label htmlFor="event-desc-label" className="event-desc-label" value={eventInfo.desc} onChange={(e) =>
              setEventInfo((u) => ({ ...u, desc: e.target.value }))
            } >Event Description:</label>
                <input type="text" className="event-desc-input" />
            </div>

            <div className="event-email">
                <label htmlFor="email-label" className="email-label" value={eventInfo.email} onChange={(e) =>
              setEventInfo((u) => ({ ...u, email: e.target.value }))
            }>Email:</label>
                <input type="email" className="email-input"/>
            </div>

            <div className="event-date/time">
                <label htmlFor="event-date/time-label" className="event-date/time-label"value={eventInfo.dateTime} onChange={(e) =>
              setEventInfo((u) => ({ ...u, dateTime: e.target.value }))
            }>Date/Time:</label>
                <input type="datetime-local" className="event-date/time-input"/>
            </div>

            <div className="event-speaker">
                <label htmlFor="event-speaker-label" className="event-speaker-label" value={eventInfo.speaker} onChange={(e) =>
              setEventInfo((u) => ({ ...u, speaker: e.target.value }))
            }> Speaker(s):</label>
                <input type="text" className="event-speaker-input"/>
            </div>

            <div className="event-dept">
                <label htmlFor="event-dept-label" className="event-dept-label" value={eventInfo.dept} onChange={(e) =>
              setEventInfo((u) => ({ ...u, dept: e.target.value }))
            }>Dept:</label>
                <input type="text" className="event-dept-input"/>
            </div>

            <div className="event-max-registrants">
                <label htmlFor="event-max-registrants-label" className="event-max-registrants-label" value={eventInfo.maxRegistrants} onChange={(e) =>
              setEventInfo((u) => ({ ...u, maxRegistrants: e.target.value }))
            }> Max Registrants: </label>
                <input type="number" className="event-max-registrants-input" />
            </div>

            <button className="event-registration" onClick={handleEventSubmit}>  Submit </button>
        </form>

        <button className="demo-button" onClick={handleDemo}>
            Demo Post Event
        </button>
    </div>
</>
    )
}
