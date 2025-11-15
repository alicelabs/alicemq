import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeTruthy();
  });

  it('displays spinner element', () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector('.spinner');
    expect(spinnerDiv).toBeInTheDocument();
  });

  it('renders a CircularProgress component', () => {
    const { container } = render(<Spinner />);
    // MUI CircularProgress renders as an svg
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
