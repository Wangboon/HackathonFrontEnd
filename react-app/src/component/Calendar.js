import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parseISO, startOfWeek, getDay } from 'date-fns';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO, // Use parseISO for ISO date format parsing
  startOfWeek,
  getDay,
  locales,
});

// Define color codes for each mood zone
const moodZoneColors = {
  yellow: '#FBC02D', // Yellow - Vibrant Yellow
  red: '#E53935',    // Red - Deep Red
  blue: '#1E88E5',   // Blue - Calm Blue
  green: '#43A047',  // Green - Natural Green
};

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard')
      .then((response) => {
        const diaries = response.data.diaries;

        const calendarEvents = diaries.map(diary => {
          // Parse the date and time from the backend (use parseISO for proper date handling)
          const eventDate = parseISO(diary.time);
          if (isNaN(eventDate.getTime())) {
            console.warn("Invalid date format for diary:", diary);
            return null;
          }

          return {
            title: `${diary.mood} (${diary.moodZone})`,
            start: eventDate,
            end: eventDate, // Use only the time from the backend without adding duration
            color: moodZoneColors[diary.moodZone.toLowerCase()] || '#000', // Default to black if color not found
          };
        }).filter(event => event !== null);

        setEvents(calendarEvents);
      })
      .catch(error => console.error('Error fetching calendar data:', error));
  }, []);

  // Custom event style function
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      }
    };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end" // Ensure the event duration is handled properly
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter} // Apply custom styles based on mood zone color
      />
    </div>
  );
};

export default CalendarComponent;
