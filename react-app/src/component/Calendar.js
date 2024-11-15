// CalendarComponent.js
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/dashboard')
      .then((response) => {
        const diaries = response.data.diaries;

        // Debugging: Log the response to ensure we have the correct data format
        console.log("Fetched diaries:", diaries);

        const calendarEvents = diaries.map(diary => {
          const eventDate = new Date(diary.time);
          
          // Debugging: Check each diary date parsing
          console.log("Event Date:", eventDate);

          return {
            title: `${diary.mood} (${diary.moodZone})`, // Combine mood and moodZone for the event title
            start: eventDate, // Start time for the event
            end: eventDate, // End time (you can set a duration if needed)
            allDay: true, // Set to true if it's an all-day event
          };
        });

        setEvents(calendarEvents);
      })
      .catch(error => {
        console.error('Error fetching calendar data:', error);
      });
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={{
          today: "Today",
          previous: "Back",
          next: "Next",
        }}
      />
    </div>
  );
};

export default CalendarComponent;
