// otel-setup.js
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { trace } = require('@opentelemetry/api');

// Tracer provider
const provider = new NodeTracerProvider();

// Exporter to Signoz OTEL collector
const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

provider.addSpanProcessor = provider.addSpanProcessor || function(processor) {
    this._spanProcessors = this._spanProcessors || [];
    this._spanProcessors.push(processor);
};
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register();

// Export tracer
const tracer = trace.getTracer('subscriber-tracer');
module.exports = tracer;
