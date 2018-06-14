import React from  '../../../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'

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