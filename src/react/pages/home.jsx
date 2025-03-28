// src/react/pages/home.jsx
import React from 'react';
import InputForm from '../components/inputform.jsx';

import Background from '../components/background.jsx';
import '../../sass/main.scss';

function Home() {
  return (
    <div className="home-page">
      <div className="form-section">
        <InputForm />
      </div>
      <Background />
    </div>
  );
}

export default Home;
