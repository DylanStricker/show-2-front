import React from 'react'

// BookForm accepts functions to be run as props
// These functions live in the parent component where 'bookform' is used
const vh = window.innerHeight * 0.01
const vw = window.innerWidth * 0.01
const ShowForm = ({ handleSubmit, handleInputChange, show }) => (
  <form onSubmit={handleSubmit}>
    <input
      name="title"
      type="text"
      placeholder="Show title here"
      value={show.title}
      onChange={handleInputChange}
    />
    <input
      name="director"
      type="text"
      placeholder="Director name"
      value={show.director}
      onChange={handleInputChange}
    />
    <input
      name="rating"
      type="number"
      placeholder="Rating /10"
      value={show.rating}
      onChange={handleInputChange}
    />
    <textarea
      name="description"
      type="text"
      rows={1 * vh}
      cols={5 * vw}
      placeholder="Describe the show"
      value={show.description}
      onChange={handleInputChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default ShowForm
