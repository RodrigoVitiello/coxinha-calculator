import React from 'react';
import { coxinhasResult } from "../../services/calculator/calculator"

interface ICalculatorResultProps {
  coxinhasResult: coxinhasResult
}

const CalculatorResult = (props: ICalculatorResultProps) => {
  const { coxinhasPerPerson, pricePerPerson } = props.coxinhasResult

  const parsedCoxinhasPerPerson = (): string => {
    if (!isFinite(coxinhasPerPerson)) return '--'

    return String(Math.round(coxinhasPerPerson * 100) / 100)
  }
  const parsedPricePerPerson = (): string => {
    if (!isFinite(pricePerPerson)) return 'R$ -----'

    return `R$ ${pricePerPerson.toFixed(2).replace('.', ',')}`
  }
  return (
    <div className='result'>
      <p className='coxinhas-per-person'>
        Coxinhas por Pessoa: <span>{parsedCoxinhasPerPerson()}</span>
      </p>
      <p className='price-per-person'>
        Valor por Pessoa: <span>{parsedPricePerPerson()}</span>
      </p>
    </div>
  )
}
export default CalculatorResult
