import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

  // Color mapping for each category
  const categoryColors = {
    Personal: "#c188d1", // Pastel Pink
    Work: "#61b4e1",     // Pastel Blue
    Other: "#cc99ff"     // Pastel Yellow
  };

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
    const eventObj = { name: newEvent, category: newCategory };
    setEvents({
      ...events,
      [selectedDate]: [...(events[selectedDate] || []), eventObj],
    });
    setNewEvent("");
  };

  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = events[selectedDate].filter((_, index) => index !== eventIndex);
    setEvents({ ...events, [selectedDate]: updatedEvents });
  };

  const filteredEvents = (date) => {
    const eventList = events[date] || [];
    return eventList.filter((event) => {
      const matchesCategory = filterCategory ? event.category === filterCategory : true;
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
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

      <div className="filter-container">
      <label style={{ fontFamily: 'cursive' }}>Filter by category: </label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>


        <label style={{ fontFamily: 'cursive' }}>Search Events: </label>
        <input
          type="text"
          placeholder="Search by event name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
              {filteredEvents(date).length > 0 && (
                <ul className="event-list">
                  {filteredEvents(date).map((event, index) => (
                    <li
                      key={index}
                      style={{ backgroundColor: categoryColors[event.category] }}
                    >
                      {event.name}
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
            {filteredEvents(selectedDate).map((event, index) => (
              <li
                key={index}
                style={{ backgroundColor: categoryColors[event.category] }}
              >
                {event.name} <span className="category">({event.category})</span>
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
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
