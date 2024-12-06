import React, { Component } from 'react';
import './planner.css';
import confetti from "canvas-confetti";

class Planner extends Component {
  constructor() {
    super();
    this.state = {
      currentDateTime: '',
      dayOfWeek: '',
      tasks: [
        // { name: 'Task 1', date: '11-20-2024', status: 'pending' },
        // { name: 'Task 2', date: '11-19-2024', status: 'completed' },
      ],
      newTaskName: '', 
      newTaskDate: '', 
      filterStatus: '', 
      searchQuery: '',   
    };
  }

  // Fetch tasks from the backend
  fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/tasks');
      const tasks = await response.json();
      this.setState({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  addTask = async () => {
    const { newTaskName, newTaskDate } = this.state;
    if (!newTaskName || !newTaskDate) {
      alert('Please provide both task name and date!');
      return;
    }

    const newTask = {
      name: newTaskName,
      date: newTaskDate,
      status: 'pending',
    };

    try {
      const response = await fetch('http://localhost:5001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const addedTask = await response.json();
        this.setState((prevState) => ({
          tasks: [...prevState.tasks, addedTask],
          newTaskName: '',
          newTaskDate: '',
        }));
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Toggle task status between 'completed' and 'pending'
  toggleTaskStatus = async (index) => {
    const task = this.state.tasks[index];
    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const response = await fetch(`http://localhost:5001/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      });

      if (response.ok) {
        this.setState((prevState) => {
          const updatedTasks = [...prevState.tasks];
          updatedTasks[index].status = updatedStatus;
          if (updatedStatus === "completed") {
            confetti({
              particleCount: 100, 
              spread: 200, 
              origin: { y: 0.6 }, 
            });
          }
          return { tasks: updatedTasks };
        });
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Delete a task
  deleteTask = async (index) => {
    const task = this.state.tasks[index];

    try {
      const response = await fetch(`http://localhost:5001/tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.setState((prevState) => {
          const updatedTasks = prevState.tasks.filter((_, i) => i !== index);
          return { tasks: updatedTasks };
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // progress of completed tasks
  calculateProgress = () => {
    const { tasks } = this.state;
  
    if (tasks.length === 0) {
      return 0; 
    }
  
    const completedTasks = tasks.filter((task) => task.status === 'completed');
    return (completedTasks.length / tasks.length) * 100;
  };


  // Get current date and time
  getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  updateDateTime = () => {
    const currentDateTime = this.getCurrentDateTime();
    this.setState({ currentDateTime });
  };

  ProgressBar = ({ progress }) => {
    return (
      <div style={{ width: '100%', background: '#ddd', borderRadius: '5px', marginBottom: '20px' }}>
        <div
          style={{
            width: `${progress}%`,
            background: '#4caf50',
            height: '20px',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white',
            lineHeight: '20px',
          }}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
    );
  };


  // Get the current day of the week
  updateDayOfWeek = () => {
    const currentDate = new Date();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekIndex = currentDate.getDay();
    const dayOfWeek = weekdays[dayOfWeekIndex];
    this.setState({ dayOfWeek });
  };

  componentDidMount() {
    this.fetchTasks();
    this.updateDateTime();
    this.updateDayOfWeek();
    setInterval(this.updateDateTime, 1000);
    setInterval(this.updateDayOfWeek, 1000);
  
    // checking for a task from calendar w local storage
    const taskToAdd = JSON.parse(localStorage.getItem("taskToAdd"));
    if (taskToAdd) {
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, taskToAdd], // adding to planner
      }));
      localStorage.removeItem("taskToAdd"); // clering local stoarge 
    }
  }
  
  

  render() {
    const { currentDateTime, dayOfWeek, tasks, newTaskName, newTaskDate } = this.state;
    const progress = this.calculateProgress();

    return (
      <div className="planner-container">
        <main>
          <div className="title">
            <h1>Planner</h1>
          </div>
          <ul className="time">
            <li>
              <span className="text">
                <h3>{currentDateTime}</h3>
                <h3>{dayOfWeek}</h3>
              </span>
            </li>
          </ul>
          {/* filter/search */}
          <div className="filter-container">
  <div className="filter-group">
  <label htmlFor="status-filter" style={{ fontFamily: 'cursive' }}>
  Filter by Status:
</label>
    <select
      id="status-filter"
      value={this.state.filterStatus}
      onChange={(e) => this.setState({ filterStatus: e.target.value })}
    >
      <option value="">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <div className="filter-group">
  <label htmlFor="task-search" style={{ fontFamily: 'cursive' }}>
  Search Tasks:
</label>
    <input
      id="task-search"
      type="text"
      placeholder="Search by task name"
      value={this.state.searchQuery}
      onChange={(e) => this.setState({ searchQuery: e.target.value })}
    />
  </div>
</div>

          <div className="list"> 
            <table>
              <thead> 
                <tr>
                  <th>Task</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
  {tasks
    .filter((task) => {
      const matchesStatus = this.state.filterStatus 
        ? task.status === this.state.filterStatus
        : true;
      const matchesSearch = task.name // search
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .map((task, index) => (
      <tr key={index}>
        <td>{task.name}</td>
        <td>{task.date}</td>
        <td>
          <button
            className={`status ${task.status}`}
            onClick={() => this.toggleTaskStatus(index)}
          >
            {task.status === 'completed' ? 'Completed' : 'Pending'}
          </button>
        </td>
        <td>
  <button
    onClick={() => this.deleteTask(index)}
    className="delete-cross"
    aria-label="Delete Task"
  >
    &times;
  </button>
  <button
  onClick={() => {
    localStorage.setItem("selectedDate", task.date); // save task date, name to local storage, redirecting to calendar page 
    localStorage.setItem("taskName", task.name); 
    window.location.href = "/calendar"; 
  }}
  className="push-to-calendar-button"
  aria-label="Push to Calendar"
>
  Push to Calendar
</button>


</td>

      </tr>
    ))}
</tbody>

            </table>
          </div>
          {/* Progress Bar */}
          <this.ProgressBar progress={progress} />
          <div className="add-task">
            <input
              type="text"
              placeholder="Task name"
              value={newTaskName}
              onChange={(e) => this.setState({ newTaskName: e.target.value })}
            />
            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => this.setState({ newTaskDate: e.target.value })}
            />
            <button onClick={this.addTask} className="add-button">
              Add Task
            </button>
          </div>
        </main>
      </div>
    );
  }
}

export default Planner;
