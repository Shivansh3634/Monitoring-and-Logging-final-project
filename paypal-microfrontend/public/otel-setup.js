

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');

const traceExporter = new OTLPTraceExporter({ url: 'http://otel.k3p.dev:4318/v1/traces' });
const metricExporter = new OTLPMetricExporter({ url: 'http://otel.k3p.dev:4318/v1/metrics' });

const sdk = new NodeSDK({
  traceExporter,
  metricExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
  .then(() => console.log('OpenTelemetry SDK started for PayPal microfrontend'))
  .catch((error) => console.error('Error starting OTEL SDK', error));
