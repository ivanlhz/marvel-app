import { render, screen } from '@testing-library/react';
import { ResultCounter } from './ResultCounter';

describe('ResultCounter', () => {
  test('renders the correct count with singular result', () => {
    render(<ResultCounter count={1} />);

    const counterElement = screen.getByText('1 RESULTS');

    expect(counterElement).toBeInTheDocument();
  });

  test('renders the correct count with multiple results', () => {
    render(<ResultCounter count={5} />);

    const counterElement = screen.getByText('5 RESULTS');

    expect(counterElement).toBeInTheDocument();
  });

  test('renders the correct count with zero results', () => {
    render(<ResultCounter count={0} />);

    const counterElement = screen.getByText('0 RESULTS');

    expect(counterElement).toBeInTheDocument();
  });
});
