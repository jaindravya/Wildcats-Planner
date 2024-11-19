import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './calendar';
import Planner from './planner';

function App() {
  return (
    <Router>
          <main>
            <Routes>
              <Route exact path="/" element={<Planner />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
    </Router>
  );
}

export default App;
