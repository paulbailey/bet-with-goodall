import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BetCategory extends Component {
  checkGroupBet (bet) {
    return Object.keys(bet).includes('A')
  }

  render () {
    console.log(this.props.bets.filter(this.checkGroupBet))
    if (this.props.bets.filter(this.checkGroupBet).length > 0) {
      const bets = this.props.bets.map(el => {
        return (
          <tr
            className={el.winning ? 'table-success' : 'table-danger'}
          >
            <td>{el.A}</td>
            <td>{el.B}</td>
            <td>{el.C}</td>
            <td>{el.D}</td>
            <td>{el.E}</td>
            <td>{el.F}</td>
            <td>{el.G}</td>
            <td>{el.H}</td>
            <td><strong>{el.winning ? el.winnings : '0.00' }</strong> <small>({el.winning ? '' : el.winnings})</small></td>
          </tr>
        )
      })
      return (<div>
        <h4>{this.props.categoryName}</h4>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th>Group A</th>
              <th>Group B</th>
              <th>Group C</th>
              <th>Group D</th>
              <th>Group E</th>
              <th>Group F</th>
              <th>Group G</th>
              <th>Group H</th>
              <th>Winnings</th>
            </tr>
          </thead>
          <tbody>
            {bets}
          </tbody>
        </table>
      </div>)
    } else {
      return (<div>
        <h4>{this.props.categoryName}</h4>
        <div>Coming soon...</div>
      </div>
      )
    }
  }
}

BetCategory.propTypes = {
  bets: PropTypes.array,
  categoryName: PropTypes.string
}

export default BetCategory
