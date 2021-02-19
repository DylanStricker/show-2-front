import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexShows = user => {
  return axios({ url: apiUrl + 'shows/', headers: { 'Authorization': `Token ${user.token}` } })
}

export const showShows = user => {
  return axios({ url: `${apiUrl}shows/${this.props.match.params.id}/`, headers: { 'Authorization': `Token ${user.token}` } })
}
