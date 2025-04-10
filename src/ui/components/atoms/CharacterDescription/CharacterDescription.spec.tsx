import { render, screen } from '@testing-library/react';
import { CharacterDescription } from './CharacterDescription';

describe('CharacterDescription', () => {
  test('renders description text', () => {
    const description = 'This is a character description';

    render(<CharacterDescription description={description} />);

    const descriptionElement = screen.getByText(description);

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass('character-description');
  });

  test('renders long description', () => {
    const longDescription =
      'This is a very long description that contains multiple sentences. It should be rendered correctly by the component. The component should handle text of any length without issues.';

    render(<CharacterDescription description={longDescription} />);

    const descriptionElement = screen.getByText(longDescription);

    expect(descriptionElement).toBeInTheDocument();
  });
});
