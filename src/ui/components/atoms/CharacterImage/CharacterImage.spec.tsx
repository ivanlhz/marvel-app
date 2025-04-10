import { render, screen } from '@testing-library/react';
import { CharacterImage } from './CharacterImage';

describe('CharacterImage', () => {
  test('renders image with correct src and alt attributes', () => {
    const src = 'https://example.com/image.jpg';
    const alt = 'Character Image';

    render(<CharacterImage src={src} alt={alt} />);

    const imageElement = screen.getByAltText(alt);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', src);
  });

  test('renders with default empty className', () => {
    render(<CharacterImage src="https://example.com/image.jpg" alt="Character Image" />);

    const containerElement = screen.getByRole('img', { name: 'Character Image' }).parentElement;

    expect(containerElement).toHaveClass('character-image');
    expect(containerElement).not.toHaveClass('character-image custom-class');
  });

  test('renders with custom className', () => {
    const customClass = 'custom-class';

    render(
      <CharacterImage
        src="https://example.com/image.jpg"
        alt="Character Image"
        className={customClass}
      />
    );

    const containerElement = screen.getByRole('img', { name: 'Character Image' }).parentElement;

    expect(containerElement).toHaveClass('character-image');
    expect(containerElement).toHaveClass(customClass);
    expect(containerElement).toHaveClass('character-image custom-class');
  });
});
