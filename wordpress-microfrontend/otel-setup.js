// otel-setup.js
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// OTLP exporter
const exporter = new OTLPTraceExporter({
  // URL agar local collector hai
  // url: 'http://localhost:4318/v1/traces'
});

// Tracer provider
const provider = new NodeTracerProvider({
  spanProcessor: new BatchSpanProcessor(exporter), // <-- is tarah pass karo 2.x me
});

// Register provider
provider.register();

// Instrumentations
registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [new ExpressInstrumentation()],
});

console.log('OpenTelemetry initialized');
