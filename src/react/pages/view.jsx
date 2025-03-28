import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ViewBackground from "../components/viewbackground";
import "../../sass/pages/_view.scss"; 

function View() {
  const [tasks, setTasks] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [showProudMessage, setShowProudMessage] = useState(false);
  const [allFilterType, setAllFilterType] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...tasks];
    updated[index].status = status;
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));

    if (status === 'done') {
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
      }, 3000);
    }
  };

  const handleDelete = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const confirmDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
    setShowProudMessage(true);
    setTimeout(() => setShowProudMessage(false), 3000);
  };

  const confirmDeleteYes = () => {
    handleDelete(confirmDeleteIndex);
    setConfirmDeleteIndex(null);
  };


  const tasksWithIndex = tasks.map((task, index) => ({ ...task, index }));


  const doneTasks = tasksWithIndex.filter(task => task.status === 'done');
  const inprogressTasks = tasksWithIndex.filter(task => task.status === 'inprogress');
  const upcomingTasks = tasksWithIndex.filter(
    task => !task.status || (task.status !== 'done' && task.status !== 'inprogress')
  );


  const sortTasksByFilter = (tasksArray, filter) => {
    if (filter === 'date') {
      return [...tasksArray].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filter === 'priority') {
    
      return [...tasksArray].sort((a, b) => a.priority - b.priority);
    } else if (filter === 'alphabet') {
      return [...tasksArray].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tasksArray;
  };

 
  const sortedAllTasks = useMemo(() => {
    return sortTasksByFilter(tasksWithIndex, allFilterType);
  }, [tasksWithIndex, allFilterType]);


  const renderTask = (task) => (
    <div key={task.index} className={`task-card ${task.status === 'done' ? 'done' : ''}`}>
      <button
        className="delete-button"
        onClick={() => confirmDelete(task.index)}
        aria-label="Delete task"
      >
        ❌
      </button>
      <div className="task-title">{task.title}</div>
      <div className="task-desc">{task.description}</div>
      <div className="task-priority">Priority: {task.priority}</div>
      <div className="task-date">
        📅 {new Date(task.date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </div>
      {task.status !== 'done' && (
        <div className="status-buttons">
          {task.status !== 'inprogress' && (
            <button
              onClick={() => updateStatus(task.index, 'inprogress')}
              className="start-button"
            >
              Start
            </button>
          )}
          <button
            onClick={() => updateStatus(task.index, 'done')}
            className="done-button"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );

  const renderListTask = (task) => (
    <div key={task.index} className="list-task-card">
      <div className="list-task-title">{task.title}</div>
      <div className="list-task-desc">{task.description}</div>
      <div className="list-task-info">
        <span className="list-task-priority">Priority: {task.priority}</span>
        <span className="list-task-date">
          📅 {new Date(task.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      </div>
    </div>
  );

  return (
    <div className="view-page">
      <ViewBackground />
      <h1>📋 Saved Tasks</h1>
      {/* Three-column display */}
      <div className="columns" style={{ display: 'flex', gap: '1rem' }}>
        <div className="column upcoming" style={{ flex: 1 }}>
          <h2>Upcoming</h2>
          <div className="task-list">
            {upcomingTasks.length === 0 ? (
              <p>No upcoming tasks.</p>
            ) : (
              upcomingTasks.map(renderTask)
            )}
          </div>
        </div>
        <div className="column inprogress" style={{ flex: 1 }}>
          <h2>In Progress</h2>
          <div className="task-list">
            {inprogressTasks.length === 0 ? (
              <p>No in progress tasks.</p>
            ) : (
              inprogressTasks.map(renderTask)
            )}
          </div>
        </div>
        <div className="column done" style={{ flex: 1 }}>
          <h2>Done</h2>
          <div className="task-list">
            {doneTasks.length === 0 ? (
              <p>No completed tasks.</p>
            ) : (
              doneTasks.map(renderTask)
            )}
          </div>
        </div>
      </div>

      <div className="all-tasks-section" style={{ marginTop: '2rem' }}>
        <h2>All Tasks</h2>
        <div className="filter-dropdown" style={{ marginBottom: '1rem', position: 'relative' }}>
          <button onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
            Filter
          </button>
          {showFilterDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => { setAllFilterType('date'); setShowFilterDropdown(false); }}>
                Sort by Date
              </li>
              <li onClick={() => { setAllFilterType('priority'); setShowFilterDropdown(false); }}>
                Sort by Priority
              </li>
              <li onClick={() => { setAllFilterType('alphabet'); setShowFilterDropdown(false); }}>
                Sort Alphabetically
              </li>
              <li onClick={() => { setAllFilterType(null); setShowFilterDropdown(false); }}>
                Clear Filter
              </li>
            </ul>
          )}
        </div>
        <div className="task-list">
          {sortedAllTasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            sortedAllTasks.map(renderListTask)
          )}
        </div>
      </div>

      <div className="button-container">
        <Link to="/" className="view-button">Home</Link>
        <Link to="/calendar" className="calendar-button">Calendar</Link>
      </div>

      {showCongrats && (
        <div className="congrats-popup">
          <div className="congrats-box">
            🎉 Congratulations! 🎉
            <div className="fireworks">
              <div className="explode"></div>
              <div className="explode delay"></div>
            </div>
          </div>
        </div>
      )}
      {confirmDeleteIndex !== null && (
        <div className="congrats-popup">
          <div className="congrats-box">
            Are you sure you want to give up?
            <div className="confirmation-buttons">
              <button className="done-button" onClick={confirmDeleteYes}>
                Yes
              </button>
              <button className="undone-button" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showProudMessage && (
        <div className="congrats-popup">
          <div className="congrats-box">
            🌟 We are proud of you!
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
