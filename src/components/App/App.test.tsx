import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

xit('renders app component', () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});
