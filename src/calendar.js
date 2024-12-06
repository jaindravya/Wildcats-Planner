import React, { useState, useEffect } from "react";
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
    Personal: "#c992d1",
    Work: "#83c99f",
    Other: "#88c6f5"
  };

  // Fetch events once on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/events");
        const data = await response.json();
        const eventsByDate = data.reduce((acc, event) => {
          const date = event.date.split("T")[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(event);
          return acc;
        }, {});
        setEvents(eventsByDate);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    // Check if date/task came from localStorage
    const savedDate = localStorage.getItem("selectedDate");
    const savedTaskName = localStorage.getItem("taskName");

    if (savedDate) {
      setSelectedDate(savedDate);
      localStorage.removeItem("selectedDate");
    }

    if (savedTaskName) {
      setNewEvent(savedTaskName);
      localStorage.removeItem("taskName");
    }
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent) {
      alert("Please enter an event name!");
      return;
    }

    const eventData = {
      name: newEvent,
      category: newCategory,
      date: selectedDate
    };

    try {
      const response = await fetch("http://localhost:5001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        // Ensure no duplicates by checking _id
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          if (!updatedEvents[selectedDate]) {
            updatedEvents[selectedDate] = [];
          }
          const exists = updatedEvents[selectedDate].some(e => e._id === addedEvent._id);
          if (!exists) {
            updatedEvents[selectedDate].push(addedEvent);
          }
          return updatedEvents;
        });
      } else {
        console.error("Error adding event to the server");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setNewEvent("");
      setNewCategory("Personal");
    }
  };

  const getWeekdays = (date_string) => {
    const weekdaysSunday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdaysMonday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekdaysTuesday = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
    const weekdaysWednesday = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
    const weekdaysThursday = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
    const weekdaysFriday = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const weekdaysSaturday = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const match_date = date_string.toLocaleDateString('en-US', { weekday: 'long' });

    if (match_date === 'Sunday') return weekdaysSunday;
    if (match_date === 'Monday') return weekdaysMonday;
    if (match_date === 'Tuesday') return weekdaysTuesday;
    if (match_date === 'Wednesday') return weekdaysWednesday;
    if (match_date === 'Thursday') return weekdaysThursday;
    if (match_date === 'Friday') return weekdaysFriday;
    if (match_date === 'Saturday') return weekdaysSaturday;
  };

  const handleDeleteEvent = async (eventIndex) => {
    const event = events[selectedDate][eventIndex];
    try {
      const response = await fetch(`http://localhost:5001/events/${event._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          updatedEvents[selectedDate] = updatedEvents[selectedDate].filter(
              (_, index) => index !== eventIndex
          );
          return updatedEvents;
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>{"<"}</button>
          <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>{">"}</button>
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

        <div className="weekdays">
          {getWeekdays(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).map((day, index) => (
              <span className="weekday" key={day}>
            {day}
          </span>
          ))}
        </div>

        <div className="calendar-grid">
          {daysInMonth.map((day) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split("T")[0];
            return (
                <div
                    key={date}
                    className={`calendar-day ${selectedDate === date ? "selected" : ""}`}
                    onClick={() => setSelectedDate(date)}
                >
                  <span>{day}</span>
                  {filteredEvents(date).length > 0 && (
                      <ul className="event-list">
                        {filteredEvents(date).map((event) => (
                            <li
                                key={event._id} // Use _id as the key instead of index
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
                        key={event._id}
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
