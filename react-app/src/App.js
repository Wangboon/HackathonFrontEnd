import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './page/Home';
import ChallengeList from './page/ChallengeList';
import ChallengeHistory from './page/ChallengeHistory';
import EncourageList from './page/EncourageList';
import FinishChallenge from './page/FinishChallenge';
import Login from './page/login';
import Register from'./page/Register';
import Membership from './page/Membership';
import DiaryMain from './page/Dairymain';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/challenge" element={<ChallengeList />} />
          <Route path="/history" element={<ChallengeHistory />} /> {/* Add ChallengeHistory route */}
          <Route path="/encourage" element={<EncourageList />} />
          <Route path="/finish" element={<FinishChallenge />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/diaryMain" element={<DiaryMain />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
