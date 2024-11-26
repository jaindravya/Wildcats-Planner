import React, { Component } from 'react';

class Planner extends Component {
  constructor() {
    super();
    this.state = {
      currentDateTime: '',
      dayOfWeek: '',
      tasks: [
        {
          name: 'Task 1',
          date: '11-20-2024',
          status: 'pending',
        },
        {
          name: 'Task 2',
          date: '11-19-2024',
          status: 'completed',
        },

      ],
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

  componentDidMount() {
    this.updateDateTime();
    this.updateDayOfWeek();
    setInterval(this.updateDateTime, 1000);
    setInterval(this.updateDayOfWeek, 1000);
  }

  render() {
    return (
      <div>
        <main>
          <div className="title">
              <h1>Planner</h1>
          </div>
          <ul className="time">
            <li>
              <span className="text">
                <h3>{this.state.currentDateTime}</h3>
                <h3>{this.state.dayOfWeek}</h3>
              </span>
            </li>
          </ul>
          <div class="list">
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {this.state.tasks.map((task, index) => (
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
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
}

export default Planner;