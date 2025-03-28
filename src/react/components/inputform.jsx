import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormButtons from './buttons.jsx';
import "../../sass/main.scss";
import "../../sass/components/_inputform.scss";

const InputForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    date: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("tasks")) || [];
    const updated = [...existing, formData];
    localStorage.setItem("tasks", JSON.stringify(updated));

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      date: new Date()
    });
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input 
          type="text" 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <p>Priority:</p>
        <label className="custom-radio">
          <input 
            type="radio" 
            name="priority" 
            value="high" 
            checked={formData.priority === 'high'} 
            onChange={handleChange} 
          />
          <span></span> High
        </label>
        <label className="custom-radio">
          <input 
            type="radio" 
            name="priority" 
            value="medium" 
            checked={formData.priority === 'medium'} 
            onChange={handleChange} 
          />
          <span></span> Medium
        </label>
        <label className="custom-radio">
          <input 
            type="radio" 
            name="priority" 
            value="low" 
            checked={formData.priority === 'low'} 
            onChange={handleChange} 
          />
          <span></span> Low
        </label>
      </div>

      <div>
        <label>Select Task Date:</label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="datepicker"
        />
      </div>

      <button type="submit">Submit</button>
      <FormButtons />
    </form>
  );
};

export default InputForm;
