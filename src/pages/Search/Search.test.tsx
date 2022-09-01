import { render, screen } from "@testing-library/react";
import { Search } from "./Search";

test('display of search input', () => {
  render(<Search />);
  const searchInput = screen.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
})