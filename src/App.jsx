import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShorthandDashboard from './components/shorthand/ShorthandDashboard';
import ShorthandPatternLibrary from './components/shorthand/ShorthandPatternLibrary';
import './App.css';

function App() {
  const [selectedSystem, setSelectedSystem] = useState('TEELINE');

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/shorthand" replace />} />
          <Route path="/shorthand" element={<ShorthandDashboard />} />
          <Route 
            path="/shorthand/patterns" 
            element={<ShorthandPatternLibrary system={selectedSystem} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;