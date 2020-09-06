import React from 'react'
import './App.scss';
import Logo from '../Logo/Logo';
import Calculator from '../Calculator/Calculator';

interface IAppProps {}
const App = (props: IAppProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>Calculadora de Coxinhas</h1>
      </header>

      <Calculator />
    </div>
  )
}

export default App;
