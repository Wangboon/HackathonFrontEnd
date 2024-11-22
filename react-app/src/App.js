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
import Dairy from './page/dairy';
import Dairy_see from './page/Dairy_see';
import EmotionGrid from "./page/EmotionGrid";
import Encourage from "./page/Encourage";
import ChallengeNomember from './page/ChallegneNomember';
import DairyNoM from './page/dairy_no_M';


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
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/dairy_no_M" element={<DairyNoM />} />
          <Route path="/dairy_no_M/:id" element={<DairyNoM />} />
          <Route path="/dairy/:id" element={<Dairy />} />
          <Route path="/emotionGrid" element={<EmotionGrid />} />
          <Route path="/encourageDiray" element={<Encourage />} />
          <Route path="/dairysee/:id" element={<Dairy_see />} />
          <Route path="/challengeNomember" element={<ChallengeNomember />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
