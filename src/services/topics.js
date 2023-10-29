import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/topics'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const get = async newObject => {
  const response = await axios.get(`${ baseUrl }/${newObject.id}`)
  return response.data
}

const getRandom = async () => {
  const response = await axios.get(`${ baseUrl }/rand`)
  return response.data
}

const erase = async oldObject => {
  const response = await axios.delete(`${ baseUrl }/${oldObject.id}`)
  return response.data
}

export default { getAll, create, get, getRandom, setToken, erase }