import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartsComponent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/dashboard/user/email/${userEmail}`)
      
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setDashboardData(null);
      });
  }, [navigate]);
    

  const generateBarChartData = () => {
    if (!dashboardData?.timeBasedMoodZoneCounts) return {};
  
    const timeBasedMoodZoneCounts = dashboardData.timeBasedMoodZoneCounts;
    const months = ['มค.', 'กพ.', 'มีน.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  
    const redData = [];
    const blueData = [];
    const yellowData = [];
    const greenData = [];
  
    const aggregatedMonthlyData = {};
  
    // Aggregate the data by month
    for (const date in timeBasedMoodZoneCounts) {
      const month = new Date(date).getMonth(); // Convert date string to month index (0 - 11)
      const monthData = timeBasedMoodZoneCounts[date];
  
      if (!aggregatedMonthlyData[month]) {
        aggregatedMonthlyData[month] = { Red: 0, Blue: 0, Yellow: 0, Green: 0 };
      }
  
      // Aggregate the values for each mood zone
      aggregatedMonthlyData[month].Red += monthData["Red"] || 0;
      aggregatedMonthlyData[month].Blue += monthData["Blue"] || 0;
      aggregatedMonthlyData[month].Yellow += monthData["Yellow"] || 0;
      aggregatedMonthlyData[month].Green += monthData["Green"] || 0;
    }
  
    // Now populate the bar chart data
    months.forEach((month, index) => {
      const monthData = aggregatedMonthlyData[index] || {};
      redData.push(monthData["Red"] || 0);
      blueData.push(monthData["Blue"] || 0);
      yellowData.push(monthData["Yellow"] || 0);
      greenData.push(monthData["Green"] || 0);
    });
  
    // Log to verify aggregated data
    console.log("Aggregated Monthly Data:", aggregatedMonthlyData);
  
    return {
      labels: months,
      datasets: [
        {
          label: 'Red Zone',
          data: redData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Blue Zone',
          data: blueData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Yellow Zone',
          data: yellowData,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
        {
          label: 'Green Zone',
          data: greenData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };
  

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="charts-container">
      <h3>Data Summary (Monthly)</h3>
      <div style={{ width: '80%', height: '500px', margin: 'auto' }}>
        <Bar
          data={generateBarChartData()}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Mood Zone Data',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
                ticks: {
                  autoSkip: false, // Prevent tick skipping
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
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartsComponent;
