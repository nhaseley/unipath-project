import * as React from "react";
import { useState } from "react";
import "./EventsPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventDetailsPage({ setError, userLoginInfo }) {
  const [eventInfo, setEventInfo] = useState({});
  const navigate = useNavigate();

  BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  async function handleEventSubmit(event) {
    // axios call to store events info in database
    event.preventDefault();
    let result = await axios.post(BASE_URL+"/postEvent", {
      name: eventInfo.name,
      desc: eventInfo.desc,
      email: eventInfo.email,
      speaker: eventInfo.speaker,
      dateTime: eventInfo.dateTime,
      dept: eventInfo.dept,
      maxRegistrants: eventInfo.maxRegistrants,
      collegeName: userLoginInfo.collegeName,
    });

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
        maxRegistrants: 0,
      });
    }

    navigate("/events");
  }

  function handleDemo() {
    setEventInfo({
      name: "nya haseley-ayende",
      desc: "This is a really cool event!!",
      email: "nylevenya@brown.edu",
      speaker: "nya",
      dept: "Mathematics",
      maxRegistrants: 100,
    });
  }

  return (
    <>
      <div className="event-registration">
        <h2 className="post_new_event_header">Post a new event here!</h2>
        <form className="event-form">
          <div className="event-name1">
            <div>
              <label htmlFor="event-name-label" className="event-name-label">
                Event Name:{" "}
              </label>
            </div>
            <div>
              <input
                type="text"
                placeHolder="Event Name"
                className="event-name-input"
                value={eventInfo.name}
                onChange={(e) =>
                  setEventInfo((u) => ({ ...u, name: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="event-email">
            <div>
              <label htmlFor="email-label" className="email-label">
                Email:
              </label>
            </div>
            <div>
              <input
                type="email"
                placeHolder="Email"
                className="email-input"
                value={eventInfo.email}
                onChange={(e) =>
                  setEventInfo((u) => ({ ...u, email: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="event-date-time">
            <div>
              <label
                htmlFor="event-date-time-label"
                className="event-date-time-label"
              >
                Date/Time:
              </label>
            </div>
            <div>
              <input
                type="datetime-local"
                className="event-date-time-input"
                value={eventInfo.dateTime}
                onChange={(e) =>
                  setEventInfo((u) => ({ ...u, dateTime: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="event-speaker">
            <div>
              <label
                htmlFor="event-speaker-label"
                className="event-speaker-label"
              >
                Speaker(s):
              </label>
            </div>
            <div>
              <input
                type="text"
                className="event-speaker-input"
                value={eventInfo.speaker}
                onChange={(e) =>
                  setEventInfo((u) => ({ ...u, speaker: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="event-dept">
            <div>
              <label htmlFor="event-dept-label" className="event-dept-label">
                Department:{" "}
              </label>
            </div>
            <input
              type="text"
              className="event-dept-input"
              value={eventInfo.dept}
              onChange={(e) =>
                setEventInfo((u) => ({ ...u, dept: e.target.value }))
              }
            />
          </div>

          <div className="event-max-registrants">
            <div>
              <label
                htmlFor="event-max-registrants-label"
                className="event-max-registrants-label"
              >
                Max Registrants:{" "}
              </label>
            </div>
            <div>
              <input
                type="number"
                className="event-max-registrants-input"
                value={eventInfo.maxRegistrants}
                onChange={(e) =>
                  setEventInfo((u) => ({
                    ...u,
                    maxRegistrants: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="event-desc">
            <div>
              <label htmlFor="event-desc-label" className="event-desc-label">
                Event Description:
              </label>
            </div>
            <div>
              <textarea
                className="event-desc-input"
                value={eventInfo.desc}
                placeholder=""
                onChange={(e) =>
                  setEventInfo((u) => ({ ...u, desc: e.target.value }))
                }
              />
            </div>
          </div>
        </form>
        <div className="bottom_buttons">
          <button className="demo-button" onClick={handleDemo}>
            Demo Post Event
          </button>

          <button
            className="event-registration-submit"
            onClick={handleEventSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
