import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Dashboard.css';
import CalendarComponent from '../component/Calendar';
import ChartsComponent from '../component/Charts';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('charts');

  return (
    <div className="dashboard">
      <div className="header-container">
        <h2
          onClick={() => setActiveSection('charts')} 
          className={activeSection === 'charts' ? 'active' : ''}
          style={{ margin: '0px 20px 0px 0px' }}
        >
          Charts
        </h2>
        <h2 
          onClick={() => setActiveSection('calendar')} 
          className={activeSection === 'calendar' ? 'active' : ''}
          style={{marginLeft: '10px'}}
        >
          Calendar
        </h2>
      </div>

      {activeSection === 'charts' && (
        <div className="dashboard-section">
          <h3>Pie Charts</h3>
          <ChartsComponent />
        </div>
      )}

      {activeSection === 'calendar' && (
        <div className="dashboard-section">
          <h3>Calendar</h3>
          <CalendarComponent />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
