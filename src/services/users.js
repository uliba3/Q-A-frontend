import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const get = async userId => {
  const response = await axios.get(`${ baseUrl }/${userId.userId}`)
  return response.data
}

export default { getAll, create, setToken, get }