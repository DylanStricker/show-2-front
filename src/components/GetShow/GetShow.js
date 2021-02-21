import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { updateShow, showShow, deleteShow } from '../../api/shows'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import IndexShows from './../IndexShows/IndexShows'

import ShowForm from '../../ShowForm/ShowForm'

class UpdateShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showObject: {
        title: '',
        author: '',
        rating: '',
        description: ''
      },
      show: {
        title: '',
        author: '',
        rating: '',
        description: ''
      },
      prevshow: {
        title: '',
        author: '',
        rating: '',
        description: ''
      },
      updated: false,
      destroyed: false
    }
  }
  // handleInputChange = (event) => {
  //   event.persist()
  //   this.setState({
  //     updated: false,
  //     [event.target.name]: event.target.value
  //   })
  //   console.log(event.target.name, event.target.value)
  // }
  handleInputChange = (event) => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    this.setState(() => {
      const updatedShow = Object.assign({}, this.state.show, updatedField)
      return { show: updatedShow, updated: false }
    })
  }
  componentDidMount () {
    showShow(this.props.user, this.props.match.params.id)
      .then((res) => {
        this.setState(state => {
          const temp = Object.assign({}, state.prevShow, res.data)
          return { prevShow: temp }
        })
      })
  }
  componentDidUpdate () {
    if (this.state.prevShow !== this.state.show && this.state.updated === true) {
      showShow(this.props.user, this.props.match.params.id)
        .then((res) => {
          this.setState(state => {
            const temp = Object.assign({}, state.prevShow, res.data)
            return { prevShow: temp }
          })
        })
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    console.log(this.state.show)
    try {
      await updateShow(user, this.state.show, this.props.match.params.id)
        .then(() => this.setState({ updated: true, show: this.state.showObject }))
        .then(() => this.setState({ updated: false }))
        .then(() => msgAlert({
          heading: 'Updated Succesfully',
          message: messages.updateShowSuccess,
          variant: 'success'
        }))
    } catch (err) {
      msgAlert({
        heading: 'Update Show failed with error: ' + err.message,
        message: messages.updateShowFailure,
        variant: 'danger'
      })
    }
  }
  handleDeleteSubmit = async (event) => {
    event.preventDefault()
    const { msgAlert, user } = this.props

    try {
      await deleteShow(user, this.props.match.params.id)
        .then(() => this.setState({ destroyed: true }))
        .then(() => msgAlert({
          heading: 'Deleted Succesfully',
          message: messages.deleteShowSuccess,
          variant: 'success'
        }))
    } catch (err) {
      msgAlert({
        heading: 'Delete Show failed with error: ' + err.message,
        message: messages.deleteShowFailure,
        variant: 'danger'
      })
    }
  }
  render () {
    if (this.state.destroyed) {
      return <Redirect to={'/shows/'}/>
    }
    const { prevShow, show } = this.state
    const showJsx = {}
    for (const key in prevShow) {
      if (prevShow.hasOwnProperty(key)) {
        showJsx[key] = prevShow[key]
      }
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={this.handleDeleteSubmit}>
            <Card>
              <Card.Header><h2>Current Show:</h2></Card.Header>
              <Card.Body>
                <Card.Text>
                  Title: {showJsx.title}<br />
                  Director: {showJsx.director}<br />
                  Rating: {showJsx.rating}<br />
                  Description: {showJsx.description}<br />
                </Card.Text>
              </Card.Body>
              <Card.Footer><Button variant="primary" type="submit">Delete</Button></Card.Footer>
            </Card>
          </Form>
          <h2>{}</h2>
          <ShowForm
            show={show}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </div>
      </div>
    )
  }
}
export default withRouter(UpdateShow)
