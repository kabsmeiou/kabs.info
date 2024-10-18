const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database / connect to uri from mongodb atlas
try {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log(`MongoDB database connection: ok! at ${connection.host}`);
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

// api routes
const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');

app.use('/projects', projectsRouter);
app.use('/users', usersRouter);

// start the server (listen to port)
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});