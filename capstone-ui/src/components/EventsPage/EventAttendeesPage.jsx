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
    numAttendees: 0,
  });

  function handleDemo(event) {
    setEventRegistrationInfo({
      firstName: "John",
      lastName: "Doe",
      numAttendees: 4,
    });
  }

  async function getEventAttendees() {
    // axios call to get the attendees for this event from the database
    let result = await axios
      .post("http://localhost:3010/getEventAttendees", {
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
      .delete("http://localhost:3010/removeEventRegistration", {
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
    // axios call to get the attendees for this event from the database
    if (
      eventRegistrationInfo.firstName != "" &&
      eventRegistrationInfo.lastName != "" &&
      eventRegistrationInfo.numAttendees != 0
    ) {
      await axios
        .post("http://localhost:3010/register/event", {
          studentId: userLoginInfo.id,
          firstName: eventRegistrationInfo.firstName,
          lastName: eventRegistrationInfo.lastName,
          numAttendees: eventRegistrationInfo.numAttendees,
          eventId: id,
        })
        .then((response) => {
          console.log("student registered: ", response.data);
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

  // TODO: registraton only appearing on refresh or return 
  console.log("eventAttendees", eventAttendees);
  return (
    <div className="event-attendees-page">
      This is the attendees for this event
      {userType == "student" ? (
        <>
          {eventAttendees.length != 0 ? (
            eventAttendees.map((attendee) => (
              <div>
                <h2>First Name: {attendee.first_name}</h2>
                <h2>Last Name: {attendee.last_name}</h2>
                <h2>Number of Attendees: {attendee.num_attendees}</h2>
              </div>
            ))
          ) : (
            <h2> No attendees registered for this event yet. </h2>
          )}
          <form>
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
            <input
              className="num-attendees-input"
              type="number"
              placeholder="Number of Attendees"
              value={eventRegistrationInfo.numAttendees}
              onChange={(e) =>
                setEventRegistrationInfo((u) => ({
                  ...u,
                  numAttendees: e.target.value,
                }))
              }
            />
          </form>
          <div className="error">
            {error.status
              ? "Registration Failed: " +
                error.message +
                " " +
                error.status +
                " Error."
              : null}
          </div>
          <button className="demo-button" onClick={handleDemo}>
            Demo Event Registration
          </button>
          <button
            className="student-event-registration-button"
            onClick={handleEventRegistration}
          >
            Register
          </button>
          <button onClick={handleRemoveEventRegistration}>
            Can't make it? Cancel Registration
          </button>
        </>
      ) : null}
    </div>
  );
}
