# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app/frontend

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install any needed packages using npm
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 3000 available to the world outside this container (if you use React's dev server)
EXPOSE 3000

# Define environment variable (if needed, like REACT_APP_...)
# ENV REACT_APP_MY_VAR value

# Run npm start when the container launches (or build command if you're building inside the container)
CMD ["npm", "start"]


# DJANGO
# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy the current directory contents into the container
COPY . /app/
