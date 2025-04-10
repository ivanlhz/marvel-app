import { render, screen } from '@testing-library/react';
import { CharacterTitle } from './CharacterTitle';

describe('CharacterTitle', () => {
  test('renders title text', () => {
    const title = 'Iron Man';

    render(<CharacterTitle title={title} />);

    const titleElement = screen.getByText(title);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('character-title');
    expect(titleElement.tagName).toBe('H1');
  });

  test('renders long title', () => {
    const longTitle = 'Doctor Strange in the Multiverse of Madness';

    render(<CharacterTitle title={longTitle} />);

    const titleElement = screen.getByText(longTitle);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('character-title');
  });
});
