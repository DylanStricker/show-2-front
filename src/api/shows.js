import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexShows = user => {
  return axios({ method: 'GET', url: apiUrl + 'shows/', headers: { 'Authorization': `Token ${user.token}` } })
}

export const showShow = (user, id) => {
  return axios({ method: 'GET', url: `${apiUrl}shows/${id}/`, headers: { 'Authorization': `Token ${user.token}` } })
}

export const createShow = (user, show) => {
  // console.log(show)
  return axios({
    method: 'POST',
    url: apiUrl + 'shows/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      title: show.title,
      director: show.director,
      rating: show.rating,
      description: show.description,
      owner: user.id
    }
  })
}

export const updateShow = (user, show, id) => {
  // console.log(show)
  return axios({
    method: 'PATCH',
    url: `${apiUrl}shows/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      title: show.title,
      director: show.director,
      rating: show.rating,
      description: show.description
    }
  })
}

export const deleteShow = (user, id) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}shows/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
