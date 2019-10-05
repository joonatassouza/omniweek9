require('dotenv/config');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(process.env.APP_PORT);