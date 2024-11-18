import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ChartsComponent = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/dashboard')
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
        data: Object.values(dataMap),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(255, 159, 64, 0.6)', // Yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const generateLineChartData = () => {
    const timeBasedMoodZoneCounts = dashboardData?.timeBasedMoodZoneCounts || {};
  
    // Extract unique zones from `timeBasedMoodZoneCounts`
    const zones = Array.from(
      new Set(
        Object.values(timeBasedMoodZoneCounts)
          .flatMap((zoneData) => Object.keys(zoneData))
      )
    );
  
    const timeLabels = Object.keys(timeBasedMoodZoneCounts).sort();
  
    const datasets = zones.map((zone) => {
      const data = timeLabels.map((date) => {
        const zoneCount = timeBasedMoodZoneCounts[date]?.[zone] || 0;
        return zoneCount;
      });
  
      return {
        label: `${zone} Zone`,
        data: data,
        borderColor: {
          Red: 'rgba(255, 99, 132, 1)',
          Blue: 'rgba(54, 162, 235, 1)',
          Green: 'rgba(75, 192, 192, 1)',
          Yellow: 'rgba(255,159,64,1)',
        }[zone],
        backgroundColor: {
          Red: 'rgba(255, 99, 132, 0)',
          Blue: 'rgba(54, 162, 235, 0)',
          Green: 'rgba(75, 192, 192, 0)',
          Yellow: 'rgba(255,159,64,0)',
        }[zone],
        fill: true,
        tension: 0.4,
      };
    });
  
    return {
      labels: timeLabels,
      datasets,
    };
  };
  

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Summary of All Zones (Daily)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Math.floor(value);
          },
        },
      },
    },
  };

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="charts-container">
      <div>
        <h3>{new Date().toISOString().slice(0, 7)} Data</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {Object.entries(dashboardData.moodZoneCounts || {}).map(([zone, moodData], i) => (
            <div
              key={`${zone}-${i}`}
              style={{
                flex: '1 1 calc(25% - 20px)',
                minWidth: '200px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <h4>{zone} Zone</h4>
              <Pie data={generatePieChartData(zone, moodData)} />
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card-summary" style={{ marginTop: '40px' }}>
        <h3>Summary of All Zones (Daily)</h3>
        <div style={{ width: '80%', height: '400px', margin: 'auto' }}>
          <Line data={generateLineChartData()} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;
