import React, { Component } from 'react';
import {
  everyTimeCall,
  halfTheTimeCall,
  everyThirdTimeCall,
} from './utilities/probFns.js';

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
    this.makeTransaction = this.makeTransaction.bind(this);
    this.tick = this.tick.bind(this);
    this.checkForSolve = this.checkForSolve.bind(this);
    this.state = {
      miners: nodes,
      nonce: 90,
      transactions: [],
      // blockchain: 
    }
  }

  componentDidMount() {
    this.setState({
      tickerId: setInterval(this.tick, 1000),
    });
  }
  componentDidUnmount() {
    clearInterval(this.state.ticker);
  }
  tick() {
    everyTimeCall(this.doWork);
    everyTimeCall(this.makeTransaction);
    everyTimeCall(this.checkForSolve)
  }
  checkForSolve() {
    //currently only grabs the first solver.
    const guesses = this.state.miners.map(miner => miner.guess);
    const winners = this.state.miners.filter(miner => miner.guess > this.state.nonce);
    if (winners.length > 0) {
      console.log('we have a winner');
      console.log(`winner:${winners[0].name}`)
    }
  }
  makeTransaction() {
    const transactionName = 'test';
    const tranactionAmount = 1;
    this.setState({
      transactions: [
        ...this.state.transactions,
        {
          address: transactionName,
          amount: tranactionAmount,
        }
      ]
    })
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
  render() {
    return (
      <div className="App">
        {
          this.state.miners.map(node => <div>name: {node.name}, guess: {node.guess}</div>)
        }
        {
          this.state.transactions.map(trans => <div> {trans.address}: {trans.amount} </div>)
        }
      </div>
    );
  }
}

export default App;
