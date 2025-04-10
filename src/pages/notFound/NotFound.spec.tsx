import { render, screen } from "@testing-library/react"
import NotFoundPage from "./NotFound"

jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...rest }: { children: React.ReactNode; to: string; [key: string]: any }) => (
    <a href={to} data-testid="mock-link" {...rest}>
      {children}
    </a>
  )
}));

describe('NotFoundPage', () => {
  it('should render the apge', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
    expect(screen.getByText('Lo sentimos, la página que estás buscando no existe o ha sido movida.')).toBeInTheDocument()
    expect(screen.getByText('Volver a la página principal')).toBeInTheDocument()
  })
})
