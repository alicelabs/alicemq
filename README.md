# AliceMQ - RabbitMQ Visualizer

[![CI](https://github.com/alicelabs/alicemq/actions/workflows/ci.yml/badge.svg)](https://github.com/alicelabs/alicemq/actions/workflows/ci.yml)
[![CodeQL](https://github.com/alicelabs/alicemq/actions/workflows/codeql.yml/badge.svg)](https://github.com/alicelabs/alicemq/actions/workflows/codeql.yml)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-28.3.3-47848f.svg)](https://www.electronjs.org/)

A real-time RabbitMQ visualization tool that uses the RabbitMQ management plugin API to query multiple endpoints (overview, queues, exchanges, bindings, channels), then parses and visualizes the data using D3.js and React. The app focuses on traffic flowing into the system, showing which exchanges are getting hit and how hard.

![AliceMQ Demo](alicemq0.gif)

## Features

- 📊 **Real-time Visualization** - Live D3.js graphs showing message flow
- 🔄 **Message Tracking** - Track messages across exchanges, queues, and consumers
- 🎨 **Color-coded Throughput** - Visual indicators for message rates
- ☁️ **Cloud Support** - Works with local and cloud RabbitMQ instances (AWS, etc.)
- 🖥️ **Cross-platform** - Desktop app for Windows, macOS, and Linux
- 🌐 **Web Interface** - Also runs as a web application

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Start with Docker](#quick-start-with-docker)
  - [Manual Installation](#manual-installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**
- **RabbitMQ** server with management plugin enabled

### Quick Start with Docker

The easiest way to get started is using Docker Compose, which sets up both RabbitMQ and AliceMQ:

```bash
# Clone the repository
git clone https://github.com/alicelabs/alicemq.git
cd alicemq

# Start RabbitMQ and AliceMQ
docker-compose up

# Access the application
# - AliceMQ Web UI: http://localhost:8080
# - RabbitMQ Management UI: http://localhost:15672 (guest/guest)
```

### Manual Installation

If you prefer to run AliceMQ without Docker:

```bash
# Clone the repository
git clone https://github.com/alicelabs/alicemq.git
cd alicemq

# Install dependencies
npm install

# For development (web interface)
npm run dev

# For Electron app development
npm run app
```

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start webpack dev server
npm run app              # Build and run Electron app

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Linting & Formatting
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Building
npm run build            # Production webpack build
npm run build:dev        # Development webpack build
npm run build:analyze    # Analyze bundle size
```

### Project Structure

```
alicemq/
├── client/              # React frontend
│   ├── Components/      # React components
│   ├── Containers/      # Container components
│   └── utils/           # Utility functions
├── server/              # Server-side code
├── assets/              # Static assets
├── test/                # Test configuration and setup
├── .github/             # GitHub Actions workflows
├── main.js              # Electron main process
└── webpack.*.js         # Webpack configurations
```

### Docker Development

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f alicemq

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up --build
```

## Building for Production

### Desktop Applications

```bash
# Build for macOS
npm run buildappmac

# Build for Windows
npm run buildappwin

# Build for Linux
npm run buildapplinux

# Build for current platform
npm run buildapp
```

Executables will be created in the `release-builds/` directory.

### Web Application

```bash
# Create production build
npm run build

# Build output will be in client/dist/
```

## Testing

AliceMQ uses Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing with RabbitMQ Test Suite

To test AliceMQ with your RabbitMQ server, use the [AliceMQ testing suite](https://github.com/alicelabs/alicemq-test-suite). It provides producer and consumer scripts that simulate all types of RabbitMQ messages: Direct, Topic, Header, and Fanout.

## Configuration

### Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```env
NODE_ENV=development
RABBITMQ_HOST=localhost
RABBITMQ_PORT=15672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
```

### Web App Mode

To run in web app mode instead of Electron:

1. Open `client/Containers/Main.jsx`
2. Change `isWeb` to `true`:

```javascript
isWeb: true;
```

3. Run: `npm run web`

### Customizing Color Legend

To modify the color legend ranges for your RabbitMQ instance's throughput:

**In `client/Components/Legend.jsx`:**

```javascript
let ranges = [
  ['0', '#bdbdbd'],
  ['1-50', '#b9f6ca'],
  ['50-150', '#ffeb3b'],
  ['150-500', '#f9a825'],
  ['500-2000', '#ff5722'],
  ['> 2000', '#b71c1c'],
];
```

**In `client/Components/NetworkGraph.jsx`:**

```javascript
function setRateColor(rate) {
  let lineColor = '';
  if (rate === 0) {
    lineColor = '#bdbdbd';
  } else if (rate > 0 && rate <= 50) {
    lineColor = '#b9f6ca';
  } else if (rate > 50 && rate <= 150) {
    lineColor = '#ffeb3b';
  } else if (rate > 150 && rate <= 500) {
    lineColor = '#f9a825';
  } else if (rate > 500 && rate <= 2000) {
    lineColor = '#ff5722';
  } else if (rate > 2000) {
    lineColor = '#b71c1c';
  }
  return lineColor;
}
```

Ensure the ranges match in both files.

## Troubleshooting

### Connecting to Cloud Services

AliceMQ supports both local and cloud RabbitMQ instances (e.g., AWS). If you have connection issues:

- ✅ Check internet connectivity
- ✅ Verify RabbitMQ server is running
- ✅ Double-check username and password
- ✅ Ensure RabbitMQ port is correct, open, and forwarded
- ✅ Check CORS configuration (see below)

### CORS Configuration

When accessing RabbitMQ API remotely, you'll need to whitelist your IP for cross-origin requests. See the [RabbitMQ CORS configuration guide](https://www.rabbitmq.com/management.html#cors).

For AWS EC2:

1. SSH into your EC2 server
2. Edit your RabbitMQ config file to enable CORS
3. Edit EC2 security group to open RabbitMQ port in inbound rules

### Common Issues

**Port already in use:**

```bash
# Change the port in docker-compose.yml or use:
PORT=3000 npm run dev
```

**Electron app won't start:**

```bash
# Rebuild electron
npm install --ignore-scripts
npm rebuild electron
```

## Built With

- [React 18](https://reactjs.org/) - UI framework
- [Electron 28](https://www.electronjs.org/) - Cross-platform desktop apps
- [D3.js 7](https://d3js.org/) - Data visualization
- [Material-UI v5](https://mui.com/) - React component library
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [Webpack 5](https://webpack.js.org/) - Module bundler
- [Jest](https://jestjs.io/) - Testing framework

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Submitting pull requests
- Reporting issues

## Version

v1.0.1

## Authors

- [Anthony Valentin](https://github.com/vhsconnect)
- [Christian Niedermayer](https://github.com/Chris-N)
- [Parker Allen](https://github.com/csrudy)
- [Siye Sam Yu](https://github.com/yudataguy)

## License

This project is licensed under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)

## Acknowledgments

- [RabbitMQ User Group](https://groups.google.com/forum/#!forum/rabbitmq-users)
- All our contributors and users

---

**Download Pre-built Packages:** Visit [AliceMQ.com](https://alicemq.com) for Windows, macOS, and Linux packages.
