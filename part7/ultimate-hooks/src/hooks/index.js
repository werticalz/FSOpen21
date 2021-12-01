import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [setResources, baseUrl])

  const create = async (resource) => {
    const response = await axios
      .post(baseUrl, resource)
    setResources([...resources, response.data])
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}