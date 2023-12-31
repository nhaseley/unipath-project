import * as React from "react";
import "./EventsPage.css";
import { useNavigate, Link } from "react-router-dom";
import ButtonMailto from "./ButtonMailto";

export default function EventCard({ event, userType }) {
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
        <div className="event-college">
          {/* <button className="event-college-button"> */}
            <Link className="event-college-button" to={"/info/" + event.college} key={event.college}>
              {event.college}
            </Link>
          {/* </button> */}
        </div>
      </div>

      <div className="summary">
        <div className="info">
          <h3 className="event-description">
            <strong><u>Description:</u></strong> {event.description}
          </h3>

          <h3 className="event-time">
            <strong><u>Date/Time:</u></strong> {formattedDate}
          </h3>
          <div className="event-email-info">
            <h3 className="event-organizer-email">
              <b><u>Organizer email:</u></b> {event.organizer_email}
            </h3>
            <div className="contact-organizer">
              <button className="mailto-button">
                <ButtonMailto
                  label="Contact Organizer"
                  mailto={"mailto:" + event.organizer_email}
                ></ButtonMailto>
              </button>
            </div>
          </div>
          <h3 className="event-speaker">
            <strong><u>Speaker:</u></strong> {event.speaker}
          </h3>
          <h3 className="event-dept">
            <strong><u>Department:</u></strong> {event.dept}
          </h3>

          <div className="event-button"></div>
        </div>
        <div className="registration">
          <button className="event-register-button" onClick={handleEventInfo}>
            {userType == "student" ? "Register" : "View Attendees"}
          </button>
          <h3 className="event-registration-limit">
            (Limit: {event.max_registrants})
          </h3>
        </div>
      </div>
    </div>
  );
}
