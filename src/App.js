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
    this.tick = this.tick.bind(this);
    this.state = {
      miners: nodes,
      workNode: {
        nonce: 90,
        transactions: []
      },
      ticker: 0,
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
    console.log('ticking');
    everyTimeCall(this.doWork);
    halfTheTimeCall(() => console.log('half the time'));
    everyThirdTimeCall(() => console.log('every third time'));
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
      </div>
    );
  }
}

export default App;
