import React, { Component } from 'react'
import slugify from 'slugify'

function slug(string) {
  return slugify(string, {lower:true})
}


class Categories extends Component {

  render() {
    const sections = this.props.betCategories.map((el) => {
      return (
        <div key={slug(el)}>
          <h4><a name={slug(el)}>{el}</a></h4>
        </div>
      )
    })
    return (
      <div>
      {sections}
      </div>
    )
  }
}

export default Categories