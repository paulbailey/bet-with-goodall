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
      bets: {},
      lastMatch: ''
    }
    checkBets(this, '2730f4455d51414f8a6b86e274176d91')
  }

  render () {
    return (
      <div className='container-fluid'>
        <h2>{this.state.title}</h2>
        <CategoryList
          bets={this.state.bets}
          lastMatch={this.state.lastMatch}
        />
      </div>
    )
  }
}

export default App
