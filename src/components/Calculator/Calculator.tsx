import React, { Component } from 'react';
import ICoxinhasData from '../../services/calculator/icoxinhasdata.interface';
import { defaultPricePerPersonValues, defaultCoxinhasCount } from '../../services/calculator/calculator';
import NumberInput from '../NumberInput/NumberInput';
import calculator from '../../services/calculator/calculator'
import CalculatorResult from './CalculatorResult';

interface ICalculatorProps { }
interface ICalculatorState {
  coxinhasData: ICoxinhasData
}

type orderedCoxinhaDataType = {
  key: string,
  labelText: string
}

class Calculator extends Component<ICalculatorProps, ICalculatorState> {
  constructor(props: ICalculatorProps) {
    super(props)

    this.state = {
      coxinhasData: {coxinhasPerBox: defaultCoxinhasCount, ...defaultPricePerPersonValues}
    }
  }

  handleInputUpdate(param: string, value: number) {
    this.setState(prevState => {
      prevState.coxinhasData[param] = value

      return  prevState
    })
  }

  renderNumberInputs() {
    const orderedCoxinhasData: Array<orderedCoxinhaDataType> = [
      { key: 'peopleCount', labelText: 'Total de pessoas' },
      { key: 'birthdayPeopleCount', labelText: 'Total de aniversariantes' },
      { key: 'boxesCount', labelText: 'Quantidade de caixas' },
      { key: 'coxinhasPerBox', labelText: 'Coxinhas por caixa' },
      { key: 'boxPrice', labelText: 'Valor da caixa' },
      { key: 'deliveryPrice', labelText: 'Valor da entrega' },
    ]
    const { coxinhasData } = this.state
    return orderedCoxinhasData.map((coxinhasInfo: orderedCoxinhaDataType, index: number) => {
      return (
        <NumberInput
          key={index}
          labelText={coxinhasInfo.labelText}
          defaultValue={coxinhasData[coxinhasInfo.key]}
          handleOnChange={(value: number) => { this.handleInputUpdate(coxinhasInfo.key, value)}}
        />
      )
    })
  }

  render() {
    const result = calculator(this.state.coxinhasData)
    return (
      <div className='calculator-container'>
        { this.renderNumberInputs() }
        <CalculatorResult coxinhasResult={result} />
      </div>
    )
  }
}

export default Calculator;
