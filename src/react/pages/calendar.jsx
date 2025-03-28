import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ViewBackground from '../components/viewbackground';
import '../../sass/pages/_calendar.scss';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksWithIndex = savedTasks.map((task, index) => ({ ...task, index }));
    setTasks(tasksWithIndex);
  }, []);

  const formatDate = (date) => {
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const tasksForSelectedDate = tasks.filter(task => {
    const taskDate = task.date ? new Date(task.date) : null;
    return taskDate && formatDate(taskDate) === formatDate(selectedDate);
  });

  return (
    <div className="calendar-page">
      <ViewBackground />
      <div className="calendar-content">
        <h1>📅 My Calendar</h1>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const dateStr = formatDate(date);
              const hasTask = tasks.some(task => {
                const taskDate = task.date ? new Date(task.date) : null;
                return taskDate && formatDate(taskDate) === dateStr;
              });
              return hasTask ? <span className="calendar-marker">📌</span> : null;
            }
          }}
        />
        <h2>Tasks on {formatDate(selectedDate)}:</h2>
        {tasksForSelectedDate.length === 0 ? (
          <p>No tasks for this date.</p>
        ) : (
          <ul className="task-list">
            {tasksForSelectedDate.map(task => (
              <li key={task.index} className="calendar-task">
                <Link to={`/view?taskIndex=${task.index}`} className="task-link">
                  <strong>{task.title}</strong>: {task.description} <em>({task.priority})</em>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="button-container">
          <Link to="/" className="view-button">Home</Link>
          <Link to="/view" className="calendar-button">View Tasks</Link>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
