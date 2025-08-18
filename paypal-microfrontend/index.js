
// ===== OpenTelemetry Setup =====
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');

const sdk = new NodeSDK({
  traceExporter: new CollectorTraceExporter({
    url: 'http://otel.k3p.dev:4318/v1/traces'  // point to your OTEL collector
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
// ===== End OpenTelemetry Setup =====

const express = require('express');
const tracer = require('./otel-setup');
const app = express();
const port = 8084;

app.get('/', (req, res) => {
    res.send('<h1>Paypal Button Microfrontend</h1>');
});

app.get('/pay', (req, res) => {
    const span = tracer.startSpan('pay-endpoint');
    span.end();
    res.send('Payment API called and traced!');
});

app.listen(port, () => {
    console.log(`Paypal Microfrontend running on port ${port}`);
});
