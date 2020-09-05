import React, { Component } from 'react';
import './App.scss';
import Logo from '../Logo/Logo';
import Calculator from '../Calculator/Calculator';

interface IAppProps {}
interface IAppState {}
class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo />
          <h1>Calculadora de Coxinhas</h1>
        </header>

        <Calculator />
      </div>
    );
  }
}

export default App;
