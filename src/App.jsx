import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './react/pages/home';
import View from './react/pages/view';
import Calendar from './react/pages/calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<View />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
