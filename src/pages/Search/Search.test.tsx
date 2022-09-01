import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "./Search";

test('search input', async () => {
  render(<Search />);
  const searchInput = screen.getByTestId('search-input');
  await userEvent.type(searchInput, 'Thor')
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('Thor');
})