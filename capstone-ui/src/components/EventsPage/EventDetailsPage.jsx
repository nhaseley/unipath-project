import * as React from "react";
import { useEffect, useState } from "react";
import "./EventsPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function EventDetailsPage ({setError}) {
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
              maxRegistrants: eventInfo.maxRegistrants
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
                dateTime:0 ,
                dept: "",
                maxRegistrants: 0
            });
          }



        navigate('/events')
    }
    console.log(eventInfo)
    
    function handleDemo() {
        setEventInfo({
          name: "nya haseley-ayende",
          desc: "This is a really cool event!!",
          email: "nylevenya@brown.edu",
          speaker: "nya",
        //   dateTime: (userLoginInfo.dateTime.toISOString().slice(0, 16)), 1000,
          dept: "6464080591",
          maxRegistrants: 100
        });
      }
    
      console.log(eventInfo.dateTime)


    return (
        <>
    <div>
        You can add a new Event Here        
    </div>   
    <div className="eventOuter">
        <form className="event-form">
            <div className="event-name">
                <label htmlFor="event-name-label" className="event-name-label" onChange={(e) =>
              setEventInfo((u) => ({ ...u, name: e.target.value }))
            }>Event Name: </label>
                <input type="text" className="event-name-input"value={eventInfo.name}  />
            </div>

            <div className="event-desc">
                <label htmlFor="event-desc-label" className="event-desc-label" onChange={(e) =>
              setEventInfo((u) => ({ ...u, desc: e.target.value }))
            } >Event Description:</label>
                <input type="text" className="event-desc-input"value={eventInfo.desc} />
            </div>

            <div className="event-email">
                <label htmlFor="email-label" className="email-label" onChange={(e) =>
              setEventInfo((u) => ({ ...u, email: e.target.value }))
            }>Email:</label>
                <input type="email" className="email-input" value={eventInfo.email} />
            </div>

            <div className="event-date/time">
                <label htmlFor="event-date/time-label" className="event-date/time-label">Date/Time:</label>
                <input type="datetime-local" className="event-date/time-input" value={eventInfo.dateTime}  onChange={(e) =>
              setEventInfo((u) => ({ ...u, dateTime: e.target.value }))
            }/>
            </div>

            <div className="event-speaker">
                <label htmlFor="event-speaker-label" className="event-speaker-label"  onChange={(e) =>
              setEventInfo((u) => ({ ...u, speaker: e.target.value }))
            }> Speaker(s):</label>
                <input type="text" className="event-speaker-input" value={eventInfo.speaker}/>
            </div>

            <div className="event-dept">
                <label htmlFor="event-dept-label" className="event-dept-label" onChange={(e) =>
              setEventInfo((u) => ({ ...u, dept: e.target.value }))
            }>Dept:</label>
                <input type="text" className="event-dept-input" value={eventInfo.dept} />
            </div>

            <div className="event-max-registrants">
                <label htmlFor="event-max-registrants-label" className="event-max-registrants-label"  onChange={(e) =>
              setEventInfo((u) => ({ ...u, maxRegistrants: e.target.value }))
            }> Max Registrants: </label>
                <input type="number" className="event-max-registrants-input" value={eventInfo.maxRegistrants} />
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
