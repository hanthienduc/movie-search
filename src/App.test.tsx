import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Search } from './pages/Search/Search';

test('renders learn react link', () => {
  render(<Search />);
  const searchInput = screen.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();
});
