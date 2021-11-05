import axios from 'axios'

const baseUrl = process.env.REACT_APP_DB_URI

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const vote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, vote }