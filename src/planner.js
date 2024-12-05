import React, { Component } from 'react';
import './planner.css';

class Planner extends Component {
  constructor() {
    super();
    this.state = {
      currentDateTime: '',
      dayOfWeek: '',
      tasks: [
        { name: 'Task 1', date: '11-20-2024', status: 'pending' },
        { name: 'Task 2', date: '11-19-2024', status: 'completed' },
      ],
      newTaskName: '', 
      newTaskDate: '', 
      filterStatus: '', 
      searchQuery: '',   
    };
  }

  getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  updateDateTime = () => {
    const currentDateTime = this.getCurrentDateTime();
    this.setState({ currentDateTime });
  };

  updateDayOfWeek = () => {
    const currentDate = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = currentDate.getDay();
    const dayOfWeek = weekdays[dayOfWeekIndex];
    this.setState({ dayOfWeek });
  };

  toggleTaskStatus = (index) => {
    const updatedTasks = [...this.state.tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === 'completed' ? 'pending' : 'completed';
    this.setState({ tasks: updatedTasks });
  };

  addTask = () => {
    const { newTaskName, newTaskDate, tasks } = this.state;
    
    if (newTaskName.trim() === '' || newTaskDate.trim() === '') {
      alert('Please enter a task name and date!');
      return;
    }
  
    const newTask = {
      name: newTaskName,
      date: newTaskDate,
      status: 'pending',
    };
  
    this.setState({
      tasks: [...tasks, newTask],
      newTaskName: '',
      newTaskDate: '',
    });
  };

  deleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    this.setState({ tasks: updatedTasks });
  };

  componentDidMount() {
    this.updateDateTime();
    this.updateDayOfWeek();
    setInterval(this.updateDateTime, 1000);
    setInterval(this.updateDayOfWeek, 1000);
  }

  render() {
    const { currentDateTime, dayOfWeek, tasks, newTaskName, newTaskDate } = this.state;
  
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
      const matchesStatus = this.state.filterStatus // NEW: Filter logic
        ? task.status === this.state.filterStatus
        : true;
      const matchesSearch = task.name // NEW: Search logic
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
        </td>
      </tr>
    ))}
</tbody>

            </table>
          </div>
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
            <button onClick={this.addTask} className="add-button">Add Task</button>
          </div>
        </main>
      </div>
    );
  }
  
}

export default Planner;