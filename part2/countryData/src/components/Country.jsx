import countriesServices from "../services/countriesServices"
import { useEffect, useState } from "react"

export const Country = () => {
  const [country, setCountry] = useState([])
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState()

  useEffect(() => {
    countriesServices
      .getCountry()
      .then((response) => {
        setCountry(response.data)
        setLanguages(response.data.languages)
        setFlag(response.data.flags.png)
        console.log(country.languages)
        // console.log(languages)
        console.log(response.data.languages)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  console.log(languages)

  return (
    <div>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      {/* Object.keys() para obtener un array de las claves (nombres de los idiomas) del objeto  */}
      <h4>Languages</h4>
      {Object.keys(country.languages).map((language, index) => (
        <div key={index}>{country.languages[language]}</div>
      ))}
      <br />
      <img src={flag}></img>
    </div>
  )
}

export default Country
