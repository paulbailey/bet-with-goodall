import React, { Component } from 'react'
import Loadable from 'react-loading-overlay'
import './App.css'
import CategoryList from './CategoryList'
import checkBets from './checkBets'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      bets: {},
      lastMatch: '',
      loading: true,
      fetchError: false
    }
    checkBets(this, '2730f4455d51414f8a6b86e274176d91')
  }

  render () {
    if (this.state.fetchError === false) {
      return (
        <Loadable
          active={this.state.loading}
          spinner
          text='Loading...'>
          <div className='container-fluid'>
            <h2>{this.state.title}</h2>
            <CategoryList
              bets={this.state.bets}
              lastMatch={this.state.lastMatch}
            />
          </div>
        </Loadable>
      )
    } else {
      return (
        <div>
          <h3>Oops, there was a problem. Please try reloading the page.</h3>
          <div className='small'>Details:</div>
          <div className='small'>{ this.state.fetchError.message }</div>
        </div>
      )
    }
  }
}

export default App
