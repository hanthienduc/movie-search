import { render, screen } from "@testing-library/react";
import { Search } from "./Search";

test('testing search page', () => {
  render(<Search />);
  const searchInput = screen.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
})