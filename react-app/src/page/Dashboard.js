import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Dashboard.css';

Chart.register(ArcElement, Tooltip, Legend);

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Success',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Edited',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    title: 'Fails',
    start: new Date(),
    end: new Date(),
  }
  
  

];

const Dashboard = () => {
  const chartData = [
    {
      title: "Green Zone",
      data: [5, 10, 15],
      labels: ['Success', 'On track', 'Goals'],
    },
    {
      title: "Blue Zone",
      data: [8, 15, 3],
      labels: ['Wins', 'Fails', 'Draws'],
    },
    {
      title: "Red Zone",
      data: [3, 10, 10],
      labels: ['Losses', 'Draws', 'Successes'],
    },
    {
      title: "Yellow Zone",
      data: [3, 6, 10],
      labels: ['Edited', 'Not Done', 'Done'],
    },
  ];

  const generateChartData = (data, labels) => ({
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 159, 64, 0.6)', // Orange
          'rgba(255, 205, 86, 0.6)', // Yellow
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="charts-container">
        {chartData.map((chart, index) => (
          <div className="chart-card" key={index}>
            <h3>{chart.title}</h3>
            <Pie data={generateChartData(chart.data, chart.labels)} />
          </div>
        ))}
      </div>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

    </div>
  );
};

export default Dashboard;
