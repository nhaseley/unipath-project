import * as React from "react";
import "./EventsPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EventAttendeesPage({
  userLoginInfo,
  userType,
  error,
  setError,
}) {
  const { id } = useParams();
  const [eventAttendees, setEventAttendees] = useState([]);
  const [eventRegistrationInfo, setEventRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    numAttendees: "",
  });

  const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3010" : "https://unipath-backend.onrender.com"

  function handleDemo() {
    setEventRegistrationInfo({
      firstName: "John",
      lastName: "Doe",
      numAttendees: 4,
    });
  }

  async function getEventAttendees() {
    // axios call to get the attendees for this event from the database
    await axios
      .post(BASE_URL+"/getEventAttendees", {
        eventId: id,
      })
      .then((response) => {
        if (response.data.length != 0) {
          setEventAttendees(response.data);
        }
      });
  }

  async function handleRemoveEventRegistration() {
    await axios
      .delete(BASE_URL+"/removeEventRegistration", {
        data: { studentId: userLoginInfo.id, eventId: parseInt(id) },
      })
      .then((response) => {
        setEventAttendees(response.data);
        if (response.data.message) {
          setError(response.data);
        } else {
          setError({});
        }
      });
  }
  async function handleEventRegistration() {
    if (
      eventRegistrationInfo.firstName != "" &&
      eventRegistrationInfo.lastName != "" &&
      eventRegistrationInfo.numAttendees != 0
    ) {
      await axios
        .post(BASE_URL+"/register/event", {
          studentId: userLoginInfo.id,
          firstName: eventRegistrationInfo.firstName,
          lastName: eventRegistrationInfo.lastName,
          numAttendees: eventRegistrationInfo.numAttendees,
          eventId: id,
        })
        .then((response) => {
          getEventAttendees();
          if (response.data.message) {
            setError(response.data);
          } else {
            setError({});
          }
        });
    } else {
      setError({
        message:
          "Please input all required fields (first name, last name and number of attendees)",
        status: 400,
      });
    }
  }

  useEffect(() => {
    getEventAttendees();
  }, [userLoginInfo]);

  return (
    <div className="event-attendees-page">
      {userType == "student" ? (
        <>
          <div className="event-registration">
            <h2 className="register-title"> Register here! </h2>
            <form className="event-registration-form">
              <div className="first-name">
                <input
                  className="first-name-input"
                  type="text"
                  placeholder="First Name"
                  value={eventRegistrationInfo.firstName}
                  onChange={(e) =>
                    setEventRegistrationInfo((u) => ({
                      ...u,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="last-name">
                <input
                  className="last-name-input"
                  type="text"
                  placeholder="Last Name"
                  value={eventRegistrationInfo.lastName}
                  onChange={(e) =>
                    setEventRegistrationInfo((u) => ({
                      ...u,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="num-attendees">
                <input
                  className="num-attendees-input"
                  type="number"
                  placeholder="Number of Attendees"
                  // defaultValue="Number of Attendees"
                  min={1}
                  value={eventRegistrationInfo.numAttendees}
                  onChange={(e) =>
                    setEventRegistrationInfo((u) => ({
                      ...u,
                      numAttendees: e.target.value,
                    }))
                  }
                />
              </div>
            </form>
            <div className="error" style={{ color: "#cc0000", width: "30vh", marginLeft: "2vh" }}>
              {error.status
                ? "Event Registration Failed: " + error.message
                : null}
            </div>
            {process.env.NODE_ENV === "development" ?
            <button className="demo-button" onClick={handleDemo}>
              Demo Event Registration
            </button>: null}
            <div className="event-register-buttons">
              <button
                className="student-event-registration-button"
                onClick={handleEventRegistration}
              >
                Register
              </button>

              <button onClick={handleRemoveEventRegistration}>
                Can't make it? Cancel Registration
              </button>
            </div>
          </div>
          </>
          ) : null}
          <h2 className="attendees">
            Event Attendees:
            {eventAttendees.length == 0 ? (
              <p className="event_reg_prompt">
                Please register for the event to view attendees.{" "}
              </p>
            ) : (
              eventAttendees.map((attendee) => (
                <div className="event-attendee-card">
                  <h3 className="attendee-name">
                    {(attendee.first_name + " " + attendee.last_name).replace(
                      /\b\w/g,
                      (match) => match.toUpperCase()
                    )}
                  </h3>
                  <h3 className="attendees-num">
                    Party Size: {attendee.num_attendees}
                  </h3>
                </div>
              ))
            )}
          </h2>
    </div>
  );
}
