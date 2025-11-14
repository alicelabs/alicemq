# CLAUDE.md - AliceMQ Project Guide

This document provides context and guidance for AI assistants working with the AliceMQ codebase.

## Project Overview

AliceMQ is a RabbitMQ visualization tool built with React, Electron, and D3.js. It connects to RabbitMQ's management plugin API to visualize message traffic flowing through exchanges, queues, bindings, and channels.

**Key Technologies:**
- React - Frontend framework
- Electron - Cross-platform desktop application
- D3.js - Data visualization library
- RabbitMQ - Message broker being visualized

## Project Structure

```
alicemq/
├── client/          # React frontend code
│   ├── Components/  # React components including NetworkGraph, Legend
│   └── Containers/  # Container components including Main.jsx
├── server/          # Backend server code
└── README.md        # User-facing documentation
```

## Key Files

- **client/Containers/Main.jsx** - Main application container, includes `isWeb` flag for web vs electron mode
- **client/Components/NetworkGraph.jsx** - D3.js visualization component, contains `setRateColor()` for traffic coloring
- **client/Components/Legend.jsx** - Color legend for message rate ranges

## Development Commands

```bash
# Install dependencies
npm install

# Build electron app
npm run buildapp

# Platform-specific builds
npm run buildappwin    # Windows
npm run buildappmac    # macOS

# Development mode (Linux)
npm run app

# Web mode
npm run web
```

## Important Configuration

### Web vs Electron Mode
To switch between web and electron mode, modify `client/Containers/Main.jsx`:
```javascript
isWeb: true  // for web mode
isWeb: false // for electron mode
```

### Traffic Color Ranges
Message rate visualization colors are configured in two places:
1. **client/Components/Legend.jsx** - Display legend
2. **client/Components/NetworkGraph.jsx** - `setRateColor()` function

Both must be kept in sync when modifying traffic rate thresholds.

## RabbitMQ API Integration

The application queries these RabbitMQ management API endpoints:
- `/overview` - General server information
- `/queues` - Queue details
- `/exchanges` - Exchange information
- `/bindings` - Routing bindings
- `/channels` - Connection channels

## Common Tasks

### Adding New Visualization Features
1. Update API data fetching logic
2. Modify D3.js visualization in `NetworkGraph.jsx`
3. Update state management in relevant containers
4. Test with both local and remote RabbitMQ instances

### Troubleshooting Connection Issues
Check:
- RabbitMQ server is running
- Management plugin is enabled
- Credentials are correct
- CORS is configured for remote connections
- Port is open and accessible

## Testing

A separate test suite is available at [alicemq-test-suite](https://github.com/alicelabs/alicemq-test-suite) for simulating RabbitMQ message patterns (Direct, Topic, Header, Fanout).

## Deployment

Pre-built packages are available at [alicemq.com](https://alicemq.com) for:
- Windows
- macOS
- Linux

## License

Mozilla Public License 2.0

## Development Considerations

- The project uses RabbitMQ management plugin API - ensure API compatibility
- Electron and web builds have different requirements (check `isWeb` flag usage)
- CORS configuration is critical for cloud/remote RabbitMQ instances
- Color ranges should be adjusted based on typical message throughput
- Linux production builds need manual packaging

## Authors

Anthony Valentin, Christian Niedermayer, Parket Allen, Siye Sam Yu
