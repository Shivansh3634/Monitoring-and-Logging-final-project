# Base image for NodeJS app
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all app files
COPY . .

# Expose app port
EXPOSE 8080

# Start the app
CMD ["node", "index.js"]
