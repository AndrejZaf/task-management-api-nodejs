# Use an official Node.js runtime as the base image
FROM node:22.14.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["node", "dist/src/server.js"]