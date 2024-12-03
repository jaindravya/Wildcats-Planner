const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDB = require('./db');

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/calendar', calendarRoutes);


// Start the server
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
