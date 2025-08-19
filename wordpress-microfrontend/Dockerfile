# Base image
FROM python:3.10-slim

# Working directory
WORKDIR /app

# Copy dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port (Flask default 5000)
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
