// src/react/components/InputForm.jsx
import React, { useState } from 'react';
import "../../sass/main.scss";
import "../../sass/components/_inputform.scss";

const InputForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your submit logic here
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
    <span></span>
    High
  </label>
  <label className="custom-radio">
    <input 
      type="radio" 
      name="priority" 
      value="medium" 
      checked={formData.priority === 'medium'} 
      onChange={handleChange} 
    />
    <span></span>
    Medium
  </label>
  <label className="custom-radio">
    <input 
      type="radio" 
      name="priority" 
      value="low" 
      checked={formData.priority === 'low'} 
      onChange={handleChange} 
    />
    <span></span>
    Low
  </label>
</div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
