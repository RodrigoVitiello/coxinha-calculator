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
    const { coxinhasData } = this.state
    return Object.keys(coxinhasData).map((key: string, index: number) => {
      return (
        <NumberInput
          key={index}
          labelText={key}
          defaultValue={coxinhasData[key]}
          handleOnChange={(value: number) => { this.handleInputUpdate(key, value)}}
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
