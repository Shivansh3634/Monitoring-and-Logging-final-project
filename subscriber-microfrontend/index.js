const express = require('express');
const tracer = require('./otel-setup');
const app = express();
const port = 8086;  // Corrected port

app.get('/', (req, res) => {
    res.send('<h1>Subscriber Microfrontend</h1>');
});

app.get('/subscribe', (req, res) => {
    const span = tracer.startSpan('subscribe-endpoint');
    span.end();
    res.send('Subscriber API called and traced!');
});

app.listen(port, () => {
    console.log(`Subscriber Microfrontend running on port ${port}`);
});
