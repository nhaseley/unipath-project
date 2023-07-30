import * as React from "react";
import { useEffect, useState } from "react";
import "./EventsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function EventDetailsPage ({setError, userLoginInfo}) {
    const [eventInfo, setEventInfo] = useState({})
    const navigate = useNavigate()

    async function handleEventSubmit (event) {
        // axios call to store events info in database
        event.preventDefault()

        let result = await axios.post(
            "http://localhost:3010/postEvent",
            {
              name: eventInfo.name,
              desc: eventInfo.desc,
              email: eventInfo.email,
              speaker: eventInfo.speaker,
              dateTime: eventInfo.dateTime,
              dept: eventInfo.dept,
              maxRegistrants: eventInfo.maxRegistrants,
              college: userLoginInfo.college
            }
          )

          if (result.data.status) {
            setError(result.data);
          } else {
            setError({});
            setEventInfo({
                name: "",
                desc: "",
                email: "",
                speaker: "",
                dateTime: 0,
                dept: "",
                maxRegistrants: 0
            });
          }

        navigate('/events')
    }
    
    function handleDemo() {
        setEventInfo({
          name: "nya haseley-ayende",
          desc: "This is a really cool event!!",
          email: "nylevenya@brown.edu",
          speaker: "nya",
          dept: "Mathematics",
          maxRegistrants: 100
        });
      }

    return (
        <>
    <h1>
        Post a new event here!      
    </h1>   
    <div className="eventOuter">
        <form className="event-form">
            <div className="event-name">
                <label htmlFor="event-name-label" className="event-name-label" >Event Name: </label>
                <input type="text" className="event-name-input"value={eventInfo.name} onChange={(e) =>
              setEventInfo((u) => ({ ...u, name: e.target.value }))
            } />
            </div>

            <div className="event-desc">
                <label htmlFor="event-desc-label" className="event-desc-label" >Event Description:</label>
                <input type="text" className="event-desc-input"value={eventInfo.desc} onChange={(e) =>
              setEventInfo((u) => ({ ...u, desc: e.target.value }))
            }  />
            </div>

            <div className="event-email">
                <label htmlFor="email-label" className="email-label" >Email:</label>
                <input type="email" className="email-input" value={eventInfo.email} onChange={(e) =>
              setEventInfo((u) => ({ ...u, email: e.target.value }))
            }/>
            </div>

            <div className="event-date/time">
                <label htmlFor="event-date/time-label" className="event-date/time-label">Date/Time:</label>
                <input type="datetime-local" className="event-date/time-input" value={eventInfo.dateTime}  onChange={(e) =>
              setEventInfo((u) => ({ ...u, dateTime: e.target.value }))
            }/>
            </div>

            <div className="event-speaker">
                <label htmlFor="event-speaker-label" className="event-speaker-label" > Speaker(s):</label>
                <input type="text" className="event-speaker-input" value={eventInfo.speaker} onChange={(e) =>
              setEventInfo((u) => ({ ...u, speaker: e.target.value }))
            }/>
            </div>

            <div className="event-dept">
                <label htmlFor="event-dept-label" className="event-dept-label">Dept: </label>
                <input type="text" className="event-dept-input" value={eventInfo.dept} onChange={(e) =>
              setEventInfo((u) => ({ ...u, dept: e.target.value }))
            } />
            </div>

            <div className="event-max-registrants">
                <label htmlFor="event-max-registrants-label" className="event-max-registrants-label"> Max Registrants: </label>
                <input type="number" className="event-max-registrants-input" value={eventInfo.maxRegistrants} onChange={(e) =>
              setEventInfo((u) => ({ ...u, maxRegistrants: e.target.value }))
            } />
            </div>

            <button className="event-registration" onClick={handleEventSubmit}>Submit</button>
        </form>

        <button className="demo-button" onClick={handleDemo}>
            Demo Post Event
        </button>
    </div>
</>
    )
}
