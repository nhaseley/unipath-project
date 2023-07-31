import * as React from "react";
import "./EventsPage.css";
import { useNavigate } from "react-router-dom";
import ButtonMailto from "./ButtonMailto";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  function formatDate(timestamp) {
    return new Date(timestamp)
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace(/(\d{4}),/, "$1")
      .replace(/(\d+:\d+)([AP]M)/i, "$1 $2");
  }
  const formattedDate = formatDate(event.date_time);

  function handleEventInfo() {
    navigate("/event-info/" + event.id);
  }

  return (
    <div className="event-card">
      <div className="intro">
        <h2 className="event-name">{event.name}</h2>
        <h3 className="event-college"> {event.college}</h3>
      </div>

      <div className="summary">
        <div className="info">
          <h3 className="event-description">
            Description: {event.description}
          </h3>

          <h3 className="event-time">Date/Time: {formattedDate}</h3>
          <div className="event-email-info">
            <h3 className="event-organizer-email">
              Organizer email: {event.organizer_email}
            </h3>
            <ButtonMailto
              label="Contact Organizer"
              mailto={"mailto:" + event.organizer_email}
            ></ButtonMailto>
          </div>
          <h3 className="event-speaker">Speaker: {event.speaker}</h3>
          <h3 className="event-dept">Department: {event.dept}</h3>

          <div className="event-button"></div>
        </div>
        <div className="registration">
          <button className="event-register-button" onClick={handleEventInfo}>
            Register
          </button>
          <h3 className="event-registration-limit">
            (Limit: {event.max_registrants})
          </h3>
        </div>
      </div>
    </div>
  );
}
