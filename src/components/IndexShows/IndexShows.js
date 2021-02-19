// imports
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { indexShows } from '../../api/shows'
// import shows from '../../data/tourData'
// import UpdateShow from './../UpdateShow/UpdateShow'
import ShowForm from '../../ShowForm/ShowForm'

// class

class IndexShows extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shows: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    indexShows(user)
      .then(res => {
        console.log(res)
        this.setState({ shows: res.data.shows })
      })
      .catch(console.error)
  }

  render () {
    let showsJsx
    let createJsx
    const { shows } = this.state
    if (!shows) {
      console.log(shows)
      showsJsx = 'Loading...'
      createJsx = <p>Loading...</p>
    } else if (!shows.length) {
      showsJsx = 'We aint got a single show!!!'
    } else {
      showsJsx = shows.map(show => (
        <li key={show.id}>
          <Link to={`/shows/${show.id}`} show={show} >
            {show.title} - {show.director}  (ID: {show.id})
          </Link>
        </li>
      ))
      createJsx = <div><ShowForm
        show={shows || null}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
      /></div>
    }
    return (
      <React.Fragment>
        <div>
          <div className="row" >
            <div className="col">
              <h1 style={{ textAlign: 'left' }}>Shows</h1>
              <h5 style={{ textAlign: 'left' }}>{showsJsx}</h5>
            </div>
            <div className="col">
              <h1 style={{ textAlign: 'right' }}>Create a Show</h1>
              {createJsx}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// exports
export default withRouter(IndexShows)
