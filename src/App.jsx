import React from 'react';
import Background from "./react/components/background.jsx";
import InputForm from "./react/components/inputform.jsx";
import './sass/main.scss';



function App() {
  return (
    <div className="app-container">
      <div className="form-container">
        <InputForm />
      </div>
      <Background />
    </div>
  );
}

export default App;
