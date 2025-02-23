import React from 'react';
import Home from './home'
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
