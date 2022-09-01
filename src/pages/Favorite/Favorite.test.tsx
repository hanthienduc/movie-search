import { render, screen } from "@testing-library/react"
import { Favorite } from "./Favorite"

test('display of favorite title', () => {
  render(<Favorite />)
  const favoriteTitle = screen.getByTestId('favorite-title')
  expect(favoriteTitle).toBeInTheDocument()
})