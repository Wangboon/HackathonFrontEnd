import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartsComponent = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard')
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  const generatePieChartData = (zone, dataMap) => ({
    labels: Object.keys(dataMap),
    datasets: [
      {
        data: Object.values(dataMap).map(value => Math.floor(value)), // Ensure integers
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(255, 206, 86, 0.6)', // Yellow
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const generateLineChartData = () => {
    const timeLabels = Object.keys(dashboardData.timeBasedMoodZoneCounts || {});

    const datasets = Object.entries(dashboardData.moodZoneCounts || {}).map(([zone, moodMap]) => {
      const data = timeLabels.map(time => dashboardData.timeBasedMoodZoneCounts[time]?.[zone] || 0);

      return {
        label: zone.charAt(0).toUpperCase() + zone.slice(1) + " Zone", // Capitalize zone name
        data,
        fill: true,
        borderColor: {
          'green': 'rgba(75, 192, 192, 1)',
          'blue': 'rgba(54, 162, 235, 1)',
          'red': 'rgba(255, 99, 132, 1)',
          'yellow': 'rgba(255, 206, 86, 1)',
        }[zone],
        backgroundColor: {
          'green': 'rgba(75, 192, 192, 0.2)',
          'blue': 'rgba(54, 162, 235, 0.2)',
          'red': 'rgba(255, 99, 132, 0.2)',
          'yellow': 'rgba(255, 206, 86, 0.2)',
        }[zone],
      };
    });

    return {
      labels: timeLabels,
      datasets,
    };
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensure the y-axis uses integer values
          callback: function(value) { return Number(value).toFixed(0); } // Display integers only
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  };

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="charts-container">
      {Object.entries(dashboardData.moodZoneCounts).map(([zone, moods], index) => (
        <div className="chart-card" key={index}>
          <h3>{zone.charAt(0).toUpperCase() + zone.slice(1)} Zone</h3>
          <Pie data={generatePieChartData(zone, moods)} />
        </div>
      ))}

      <div className="chart-card-summary">
        <h3>Summary of All Zones</h3>
        <Line data={generateLineChartData()} options={lineChartOptions} />
        <p className="chart-summary">
          This line chart represents the combined data trends over time across all zones, showing the mood progression for Green, Blue, Red, and Yellow zones.
        </p>
      </div>
    </div>
  );
};

export default ChartsComponent;
