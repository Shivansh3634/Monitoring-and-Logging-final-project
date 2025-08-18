// index.js
require('./otel-setup'); // OTEL setup

const express = require('express');
const app = express();
const port = 8082; // tumhare tunnel ke liye port

app.get('/', (req, res) => {
  res.send('Hello from WordPress Microfrontend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
