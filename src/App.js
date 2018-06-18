import React, { Component } from 'react'
import './App.css'
import CategoryList from './CategoryList'
import checkBets from './checkBets'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      bets: {}
    }
    checkBets(this, '2730f4455d51414f8a6b86e274176d91')
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1>Bet With Goodall</h1>
        <h2>{this.state.title}</h2>
        <h3>Matchday {this.state.matchday}</h3>
        <CategoryList
          bets={this.state.bets}
        />
      </div>
    )
  }
}

export default App
