const express = require('express');
const cors = require('cors');

const users = require('./controller/users.controller');
const events = require('./controller/events.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', users);
app.use('/users/events', events);

app.use((error, req, res, _next) => res.send(error.message));

module.exports = app;
