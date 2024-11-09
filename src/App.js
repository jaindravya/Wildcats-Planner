import './App.css';

import Calendar from './calendar';
import Planner from './planner';

function App() {
  return (
    <Router>
      <div id="wrapper">
        <div id="content">
          <main>
            <Switch>
              <Route exact path="/" component={Planner} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
