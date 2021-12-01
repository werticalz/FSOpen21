import { useEffect, useState } from 'react'
import axios from 'axios'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async (name) => {
      const response = await axios
        .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      setCountry(response.data)
    }
    if (name) {
      getCountry(name)
    }
  }, [name])

  if (!name || !country) {
    return null
  }

  return country
}