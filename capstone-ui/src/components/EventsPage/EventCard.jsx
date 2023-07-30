import * as React from "react";
import "./EventsPage.css";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const formatDate = (timestamp) =>
    new Date(timestamp)
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace(/(\d{4}),/, "$1")
      .replace(/(\d+:\d+)([AP]M)/i, "$1 $2");

  const formattedDate = formatDate(event.date_time);

  return (
    <div className="event-card">
      <Link to={"/event-info/" + event.id} className="event-link">
        <div className="event-date-time">
          <h3> College: {event.college}</h3>
          <div className="summary">
            <h3>Name: {event.name}</h3>
            <h3>Description: {event.description}</h3>
          </div>
          <h3>Date/Time: {formattedDate}</h3>
          <h3>Organizer email: {event.organizer_email}</h3>
          <h3>Speaker: {event.speaker}</h3>
          <h3>Department: {event.dept}</h3>
          <h3>Max Number of Registrants: {event.max_registrants}</h3>
        </div>
      </Link>
    </div>
  );
}
