// imports
import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Link, withRouter, Redirect } from 'react-router-dom'

import { indexShows, createShow } from '../../api/shows'

import ShowForm from '../../ShowForm/ShowForm'

// class

class IndexShows extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shows: null,
      newShow: {
        title: '',
        author: '',
        rating: '',
        description: '',
        owner: ''
      },
      created: ''
    }
  }

  componentDidMount () {
    const { user } = this.props
    indexShows(user)
      .then(res => {
        this.setState({ shows: res.data.shows })
      })
      .catch(console.error)
  }
  handleInputChange = (event) => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    this.setState(() => {
      const createdShow = Object.assign({}, this.state.newShow, updatedField)

      // Object.assign copies key/value pairs from one or more objects to a target object
      // Empty object is the 1st argument (modified in place)
      // state is the 2nd argument
      // updatedField is the 3rd argument (comes after the state so it oerrides the state values)
      // const newBook = Object.assign({}, this.state.show, updatedField)

      return { newShow: createdShow }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { user } = this.props
    const { newShow } = this.state
    // console.log(this.state.newShow)
    createShow(user, newShow)
      .then((res) => this.setState({ created: res.data.id }))
      .catch(console.error)
  }
  render () {
    if (this.state.created) {
      return <Redirect to={`/shows/${this.state.created}/`}/>
    }
    let showsJsx
    const { shows, newShow } = this.state
    if (!shows) {
      showsJsx = 'Loading...'
    } else if (!shows.length) {
      showsJsx = 'We aint got a single show!!!'
    } else {
      showsJsx = shows.map(show => (
        <li key={show.id}>
          <Link to={`/shows/${show.id}/`} show={show} >
            {show.title} - {show.director}  (ID: {show.id})
          </Link>
        </li>
      ))
    }
    const createJsx = <ShowForm
      show={shows || newShow}
      handleSubmit={this.handleSubmit}
      handleInputChange={this.handleInputChange}
    />
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h1 style={{ textAlign: 'left' }}>Shows</h1>
              <h5 style={{ textAlign: 'left' }}>{showsJsx}</h5>
            </Col>
            <Col>
              <h1 style={{ textAlign: 'right' }}>Create a Show</h1>
              {createJsx}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

// exports
export default withRouter(IndexShows)
