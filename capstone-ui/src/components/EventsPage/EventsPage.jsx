import * as React from "react";
import "./EventsPage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";

export default function EventsPage({ userLoginInfo, userLoggedIn, userType }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  function handleAddNewEvent(event) {
    event.preventDefault();

    navigate("/eventDetails");
  }
  async function getAllEvents() {
    // userType == "student"
      // ? 
      await axios
          .post("http://localhost:3010/getAllEvents", {
            college: userLoginInfo.college,
          })
          .then((response) => setEvents(response.data))
      // : await axios
      //     .post("http://localhost:3010/getAllEvents", { 
      //       college: userLoginInfo.college,
      //     })
          // .then((response) => setEvents(response.data));
  }
  useEffect(() => {
    getAllEvents();
  }, [userLoginInfo]);

  return (
    <div className="events-page">
      <h1>Welcome, {userLoginInfo?.firstName} to the events page!</h1>

      {userType == "college-admission-officer" ? (
        <button onClick={handleAddNewEvent}> Add a new Event</button>
      ) : null}

      {/* {userType == "student" || "parent" ? ( */}
      <div>
        {events.length == 0 ? (
          <h2>No events for this college have been posted yet.</h2>
        ) : (
          <div className="events-list">
            {events?.map((event) => (
              <EventCard event={event}></EventCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
