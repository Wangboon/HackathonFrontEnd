import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Dashboard.css';
import CalendarComponent from '../component/Calendar';
import ChartsComponent from '../component/Charts';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('charts');

  return (
    <div className="dashboard">
      <ChartsComponent/>
      <CalendarComponent/>
    </div>
  );
};

export default Dashboard;
