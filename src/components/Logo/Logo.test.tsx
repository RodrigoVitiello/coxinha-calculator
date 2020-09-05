import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

it('renders coxinhas logo component', () => {
  const { container } = render(<Logo />);

  expect(container).toMatchSnapshot();
});
