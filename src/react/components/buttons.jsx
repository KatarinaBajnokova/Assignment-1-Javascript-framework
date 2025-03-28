import React from 'react';
import { Link } from 'react-router-dom';
import "../../sass/components/_inputform.scss";

function FormButtons() {
  return (
    <div className="button-container">
      <Link to="/view" className="view-button">View</Link>
      <Link to="/calendar" className="calendar-button">Calendar</Link>
    </div>
  );
}

export default FormButtons;
