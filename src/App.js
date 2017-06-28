import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const nodes = [
  {
    name: 'Alice',
    guess: 0,
  },
  {
    name: 'Bob',
    guess: 0,
  },
  {
    name: 'Charlie',
    guess: 0,
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.makeGuess = this.makeGuess.bind(this);
    this.doWork = this.doWork.bind(this);
    this.state = {
      miners: nodes,
      workNode: {
        nonce: 70,
        transactions: []
      }
    }
  }
  makeGuess(node, i, minersArray) {
    const guess = Math.round(Math.random() * 100);
    const newMiner = { ...node, guess };
    const miners = [...this.state.miners];
    miners.splice(i, 1, newMiner);

    this.setState({
      miners,
    })
  }
  doWork(nodes) {
    this.state.miners.forEach(this.makeGuess);
  }
  componentDidMount() {
    this.setState({
      ticker: setInterval(this.doWork, 1000),
    });
  }
  componentDidUnmount() {
    clearInterval(this.state.ticker);
  }
  render() {
    return (
      <div className="App">
        {
          this.state.miners.map(node => <div>name: {node.name}, guess: {node.guess}</div>)
        }
      </div>
    );
  }
}

export default App;
