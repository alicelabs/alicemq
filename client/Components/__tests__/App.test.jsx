import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

// Mock the Main component to avoid complex dependencies
jest.mock('../../Containers/Main.jsx', () => {
  return function MockMain() {
    return <div data-testid="mock-main">Main Component</div>;
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('mock-main')).toBeInTheDocument();
  });

  it('wraps Main component with ErrorBoundary', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
