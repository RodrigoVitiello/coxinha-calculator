import React from 'react';
import { render } from '@testing-library/react';
import CalculatorResult from './CalculatorResult';

describe('CalculatorResult', () => {
  let coxinhasResult = {
    pricePerPerson: Math.floor(Math.random() * 100),
    coxinhasPerPerson: Math.floor(Math.random() * 100)
  }

  it('parse the price per person correctly', () => {
    coxinhasResult.pricePerPerson = 10.5
    const { getByText } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(getByText('R$ 10,50')).toBeInTheDocument()
  })

  it('parse the number of coxinhas per person up to two decimal places', () => {
    coxinhasResult.coxinhasPerPerson = 45.1
    const { getByText } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(getByText('45.1')).toBeInTheDocument()
  })

  it('parse the number of coxinhas per person up to two decimal places', () => {
    coxinhasResult.coxinhasPerPerson = 33.3333333
    const { getByText } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(getByText('33.33')).toBeInTheDocument()
  })

  it('does not show decimal places for integer coxinhas number', () => {
    coxinhasResult.coxinhasPerPerson = 50
    const { getByText } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(getByText('50')).toBeInTheDocument()
  })

  it('renders "--" when there is an invalid value', () => {
    coxinhasResult.coxinhasPerPerson = NaN
    const { container } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(container.querySelector('.coxinhas-per-person')).toHaveTextContent('--')
  })

  it('renders "--" when there is an invalid value', () => {
    coxinhasResult.pricePerPerson = Infinity
    const { container } = render(<CalculatorResult coxinhasResult={coxinhasResult} />);

    expect(container.querySelector('.price-per-person')).toHaveTextContent('R$ -----')
  })
});
