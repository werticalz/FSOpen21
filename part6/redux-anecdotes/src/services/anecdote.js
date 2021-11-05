import axios from 'axios'

const baseUrl = process.env.REACT_APP_DB_URI

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }