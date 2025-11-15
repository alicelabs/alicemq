import React, { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: 3,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3, maxWidth: 600 }}>
            We&apos;re sorry for the inconvenience. An unexpected error has occurred.
          </Typography>
          {this.state.error && (
            <Box
              sx={{
                backgroundColor: '#fff',
                padding: 2,
                borderRadius: 1,
                maxWidth: 800,
                width: '100%',
                mb: 3,
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography variant="body2" color="error" sx={{ fontFamily: 'monospace' }}>
                {this.state.error.toString()}
              </Typography>
              {this.state.errorInfo && (
                <Typography
                  variant="caption"
                  component="pre"
                  sx={{
                    mt: 1,
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    maxHeight: 200,
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </Typography>
              )}
            </Box>
          )}
          <Button variant="contained" color="primary" onClick={this.handleReset}>
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
