import React from 'react'

export default (props) => {
  const sortedKeys = Object.keys(props).sort()
  const cells = sortedKeys.map((k) => {
    return (
      <td
        key={k}
      >{props[k]}</td>
    )
  })
  return (
    <tr>
      {cells}
    </tr>
  )
}
