import * as React from "react";
import "./EventsPage.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function EventAttendeesPage({ userLoginInfo }) {
  const { id } = useParams();
  const [eventAttendees, setEventAttendees] = useState({});

  async function getEventAttendees() {
    // axios call to get the attendees for this event from the database
    let result = await axios.post(
      "http://localhost:3010/getEventAttendees",
      {
        eventId: id,
      }).then((response) => {
        setEventAttendees(response.data);
        console.log("attendees from backend: ", response.data);
      })

    if (result.data.status) {
      setError(result.data);
    } else {
      setError({});
      setEventAttendees({});
    }
  }

  useEffect(() => {
    getEventAttendees();
  }, [userLoginInfo]);

  console.log("eventAttendees", eventAttendees);
  return (
    <div className="event-attendees-page">
      This is the attendees for this event
    </div>
  );
}
