import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (newEvent.trim() === "") return;
    setEvents({
      ...events,
      [selectedDate]: [...(events[selectedDate] || []), newEvent],
    });
    setNewEvent("");
  };

  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = events[selectedDate].filter((_, index) => index !== eventIndex);
    setEvents({ ...events, [selectedDate]: updatedEvents });
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>{">"}</button>
      </header>

      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split("T")[0];
          return (
            <div
              key={day}
              className={`calendar-day ${selectedDate === date ? "selected" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span>{day}</span>
              {events[date] && (
                <ul className="event-list">
                  {events[date].map((event, index) => (
                    <li key={index}>
                      {event}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="event-form">
          <h3>Events for {selectedDate}</h3>
          <ul>
            {(events[selectedDate] || []).map((event, index) => (
              <li key={index}>
                {event}
                <button className="delete-btn" onClick={() => handleDeleteEvent(index)}>
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add new event"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
