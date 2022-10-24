import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


beforeEach(() => {
  render(<App />);
})

it('should render the date', () => {
  const options = {weekday: "long", month: "long", day: "numeric"};
  const date = new Date();
  const day = date.toLocaleDateString('fr-FR', options as any);

  const time = date.toLocaleTimeString('fr-FR', {hour: "2-digit", minute: "2-digit"});

  expect(screen.getByText(`${day}, ${time}`)).toBeInTheDocument();
});

it('should render titles popular movies and popular tv shows', () => {
  expect(screen.getByText("Derniers Films Populaires")).toBeInTheDocument();
  expect(screen.getByText("Dernières Séries Populaires")).toBeInTheDocument();
})

// it('should render the watchlist button', () => {

// });