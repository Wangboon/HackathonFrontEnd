import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './page/Home';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
