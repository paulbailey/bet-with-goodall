import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BetCategory extends Component {
  render () {
    const bets = this.props.bets.map(el => {
      return (
        <tr>
          <td>{el.A}</td>
          <td>{el.B}</td>
          <td>{el.C}</td>
          <td>{el.D}</td>
          <td>{el.E}</td>
          <td>{el.F}</td>
          <td>{el.G}</td>
          <td>{el.H}</td>
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
          </tr>
        </thead>
        <tbody>
          {bets}
        </tbody>
      </table>
    </div>)
  }
}

BetCategory.propTypes = {
  bets: PropTypes.array,
  categoryName: PropTypes.string
}

export default BetCategory
