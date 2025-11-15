# Development Dockerfile for AliceMQ
FROM node:20-alpine

WORKDIR /app

# Install dependencies for Electron (needed for building)
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    libx11 \
    libxext \
    libxrender \
    libxtst \
    libxi \
    nss \
    cups \
    glib \
    gtk3 \
    libnotify \
    alsa-lib

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Expose webpack dev server port
EXPOSE 8080

# Default command for development
CMD ["npm", "run", "dev"]
