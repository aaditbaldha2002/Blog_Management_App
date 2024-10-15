# Base image with Node.js
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY */*.json ./
RUN npm install --legacy-peer-deps
RUN npm audit fix

# Copy the entire application
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight HTTP server to serve the static files
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port 3000 for the container
EXPOSE 3000
