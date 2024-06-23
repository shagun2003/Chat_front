import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './component/join/join.js';
import Cat from './component/Cat/Cat.js';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Join />} />
          <Route path='/cat' element={<Cat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;