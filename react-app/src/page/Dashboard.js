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
        <h3
          onClick={() => setActiveSection('charts')} 
          className={activeSection === 'charts' ? 'active' : ''}
          style={{ margin: '0px 20px 0px 0px' }}
        >
          Charts
        </h3>
        <h3
          onClick={() => setActiveSection('calendar')} 
          className={activeSection === 'calendar' ? 'active' : ''}
          style={{marginLeft: '10px'}}
        >
          Calendar
        </h3>
      </div>

      {activeSection === 'charts' && (
        <div className="dashboard-section">
          
          <ChartsComponent />
        </div>
      )}

      {activeSection === 'calendar' && (
        <div className="dashboard-section">
          
          <CalendarComponent />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
