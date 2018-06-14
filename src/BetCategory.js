import React from 'react'

export default (props) => {
  const bets = props.bets.map(el => {
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
    <h4>{props.categoryName}</h4>
    <table className='table table-sm'>
      <thead>
        <th>Group A</th>
        <th>Group B</th>
        <th>Group C</th>
        <th>Group D</th>
        <th>Group E</th>
        <th>Group F</th>
        <th>Group G</th>
        <th>Group H</th>
      </thead>
      <tbody>
      {bets}
      </tbody>
    </table>
    </div>)
}