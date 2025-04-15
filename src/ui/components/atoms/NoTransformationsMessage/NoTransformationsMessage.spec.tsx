import { render, screen } from '@testing-library/react';
import NoTransformationsMessage from './NoTransformationsMessage';

describe('NoTransformationsMessage', () => {
  it('should render the message correctly', () => {
    render(<NoTransformationsMessage />);

    expect(screen.getByText('Actualmente no tiene transformaciones.')).toBeInTheDocument();
  });
});
