import React, { Component } from 'react'
import slugify from 'slugify'

function slug(string) {
  return slugify(string, {lower:true})
}

class CategoryList extends Component {

  render() {
    const cats = this.props.betCategories.map((el) => {
      return (
      <li key={slug(el)} className='nav-item'>
      <a className='nav-link' href={`#${slug(el)}`}>{el}</a></li>
    )
    })

    return (
      <ul className='nav'>
        {cats}
      </ul>
    )
  }
}

export default CategoryList