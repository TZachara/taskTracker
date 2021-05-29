const express = require('express');
const connectDB = require('./db/db');
const routerConfig = require('./routes/routerConfig');
const tasksRoute = require('./routes/tasks');
const app = express();

connectDB();

app.use(express.json());
app.use(routerConfig.tasksURL, tasksRoute);

module.exports = app;
