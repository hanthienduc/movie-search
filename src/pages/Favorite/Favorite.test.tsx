import { render, screen } from "@testing-library/react"
import { Favorite } from "./Favorite"

test('test favorite', () => {
  render(<Favorite />)
  const favoriteTitle = screen.getByTestId('favorite-title')
  expect(favoriteTitle).toBeInTheDocument()
})