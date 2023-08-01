import React from "react";
import { Link } from "react-router-dom";

export default function ButtonMailto({ mailto, label }) {
  return (
    <Link
      to="#"
      onClick={(e) => {
        window.location.href = mailto;
        e.preventDefault();
      }}
    >
      {label}
    </Link>
  );
}
