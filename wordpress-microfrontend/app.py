from flask import Flask
from opentelemetry import trace, metrics
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

app = Flask(__name__)

# Tracing
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)
otlp_exporter = OTLPSpanExporter(endpoint="http://10.172.27.11:4318/v1/traces")
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Metrics
metrics.set_meter_provider(MeterProvider())
meter = metrics.get_meter(__name__)
metric_exporter = OTLPMetricExporter(endpoint="http://10.172.27.11:4318/v1/metrics")

@app.route("/")
def index():
    with tracer.start_as_current_span("index_page"):
        print("Index page visited")  # logging replaced with print
        return "Hello from WordPress microfrontend!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8086, debug=True)
