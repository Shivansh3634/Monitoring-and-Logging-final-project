from opentelemetry import trace
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# Service ka naam
resource = Resource(attributes={
    SERVICE_NAME: "wordpress-microfrontend"
})

# Tracer provider set
trace.set_tracer_provider(TracerProvider(resource=resource))
tracer = trace.get_tracer(__name__)

# Exporter -> SigNoz
otlp_exporter = OTLPSpanExporter(
    endpoint="http://10.172.27.11:4318/v1/traces"
)

# Add processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)
