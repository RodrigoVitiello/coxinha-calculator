import React from 'react';
import { coxinhasResult } from "../../services/calculator/calculator"

interface ICalculatorResultProps {
  coxinhasResult: coxinhasResult
}

const CalculatorResult = (props: ICalculatorResultProps) => {
  const { coxinhasPerPerson, pricePerPerson } = props.coxinhasResult

  const parsedCoxinhasPerPerson = (): string => {
    return String(Math.round(coxinhasPerPerson * 100) / 100)
  }
  const parsedPricePerPerson = (): string => {
    return `R$ ${pricePerPerson.toFixed(2).replace('.', ',')}`
  }
  return (
    <div className='result'>
      <p>Coxinhas por Pessoa: <span>{parsedCoxinhasPerPerson()}</span></p>
      <p>Valor por Pessoa: <span>{parsedPricePerPerson()}</span></p>
    </div>
  )
}
export default CalculatorResult
