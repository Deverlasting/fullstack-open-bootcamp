// import countriesServices from "../services/countriesServices"
// import { useEffect, useState } from "react"

// export const Country = ({ filteredTextCountry }) => {
//   const [allCountries, setAllCountries] = useState([])
//   const [filteredCountries, setFilteredCountries] = useState([])
//   const [selectedCountry, setSelectedCountry] = useState(null)
//   const [weather, setWeather] = useState(null)
//   const API_KEY = import.meta.env.VITE_WEATHER_KEY
//   // const API_KEY = process.env.API_KEY

//   // Obtener todos los países al cargar el componente
//   useEffect(() => {
//     countriesServices
//       .getAll()
//       .then((response) => {
//         setAllCountries(response.data)
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error)
//       })
//   }, [])

//   // Filtrar países según el texto de búsqueda
//   useEffect(() => {
//     if (allCountries.length > 0) {
//       const filtered = allCountries.filter((country) =>
//         country.name.common.toLowerCase().includes(filteredTextCountry.toLowerCase())
//       )
//       setFilteredCountries(filtered)
//     }
//   }, [allCountries, filteredTextCountry])

//   // Llamar a la API de tiempo cuando solo haya un país filtrado
//   useEffect(() => {
//     if (filteredCountries.length === 1) {
//       const capital = filteredCountries[0].capital[0]
//       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
//         .then((response) => response.json())
//         .then((data) => setWeather(data))
//         .catch((error) => console.error("Error fetching weather data:", error))
//     } else {
//       setWeather(null)
//     }
//   }, [filteredCountries, API_KEY])

//   // Manejar el clic en el botón de mostrar país
//   const handleClick = (countryName) => {
//     const country = allCountries.find((country) => country.name.common === countryName)
//     setSelectedCountry(country)

//     const capital = country.capital
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
//       .then((response) => response.json())
//       .then((data) => setWeather(data))
//       .catch((error) => console.error("Error fetching weather data:", error))
//   }

//   // Contenido para mostrar
//   let filteredContent

//   if (filteredCountries.length > 10) {
//     filteredContent = <div>Too many coincidences</div>
//   } else if (filteredCountries.length === 1) {
//     // Si solo hay un país filtrado, mostrar sus detalles directamente
//     const country = filteredCountries[0]
//     filteredContent = (
//       <div>
//         <div>Only one coincidence</div>
//         <p>Capital: {country.capital}</p>
//         <p>Area: {country.area}</p>
//         <h4>Languages</h4>
//         {Object.values(country.languages).map((language, index) => (
//           <div key={index}>{language}</div>
//         ))}
//         <br />
//         <img src={country.flags.png} alt="Flag"></img>
//         {weather && (
//           <div>
//             <h4>Weather in {country.capital}</h4>
//             <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
//             <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
//             <p>Wind: {weather.wind.speed} m/s</p>
//           </div>
//         )}
//       </div>
//     )
//   } else {
//     // Si hay varios países filtrados, mostrar botones para cada uno
//     filteredContent = filteredCountries.map((country, index) => (
//       <div key={index}>
//         {country.name.common}
//         <button onClick={() => handleClick(country.name.common)}>Show</button>
//       </div>
//     ))
//   }

//   // Mostrar el país seleccionado si hay uno
//   const selectedCountryContent = selectedCountry && (
//     <div>
//       <h3>{selectedCountry.name.common}</h3>
//       <p>Capital: {selectedCountry.capital}</p>
//       <p>Area: {selectedCountry.area}</p>
//       <h4>Languages</h4>
//       {Object.values(selectedCountry.languages).map((language, index) => (
//         <div key={index}>{language}</div>
//       ))}
//       <br />
//       <img src={selectedCountry.flags.png} alt="Flag"></img>
//       {weather && (
//         <div>
//           <h4>Weather in {selectedCountry.capital}</h4>
//           <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
//           <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
//           <p>Wind: {weather.wind.speed} m/s</p>
//         </div>
//       )}
//     </div>
//   )

//   return (
//     <div>
//       <hr />
//       <h3>Filtered Countries</h3>
//       {selectedCountry ? selectedCountryContent : filteredContent}
//       <hr />
//     </div>
//   )
// }

// export default Country

import countriesServices from "../services/countriesServices"
import { useEffect, useState } from "react"

export const Country = ({ filteredTextCountry }) => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const API_KEY = import.meta.env.VITE_WEATHER_KEY

  // Obtener todos los países al cargar el componente
  useEffect(() => {
    countriesServices
      .getAll()
      .then((response) => {
        setAllCountries(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  // Filtrar países según el texto de búsqueda
  useEffect(() => {
    if (allCountries.length > 0) {
      const filtered = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(filteredTextCountry.toLowerCase())
      )
      setFilteredCountries(filtered)
      setSelectedCountry(null)
    }
  }, [allCountries, filteredTextCountry])

  // Llamar a la API de tiempo cuando solo haya un país filtrado
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0]
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error))
    } else {
      setWeather(null)
    }
  }, [filteredCountries, API_KEY])

  // Manejar el clic en el botón de mostrar país
  const handleClick = (countryName) => {
    const country = allCountries.find((country) => country.name.common === countryName)
    setSelectedCountry(country)

    const capital = country.capital[0]
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error))
  }

  // Contenido para mostrar
  let filteredContent

  if (filteredCountries.length > 10) {
    filteredContent = <div>Too many coincidences</div>
  } else if (filteredCountries.length === 1 && !selectedCountry) {
    // Si solo hay un país filtrado y no se ha seleccionado, mostrar sus detalles directamente
    const country = filteredCountries[0]
    filteredContent = (
      <div>
        <div>Only one coincidence</div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h4>Languages</h4>
        {Object.values(country.languages).map((language, index) => (
          <div key={index}>{language}</div>
        ))}
        <br />
        <img src={country.flags.png} alt="Flag"></img>
        {weather && (
          <div>
            <h4>Weather in {country.capital}</h4>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
  } else {
    // Si hay varios países filtrados, mostrar botones para cada uno
    filteredContent = filteredCountries.map((country, index) => (
      <div key={index}>
        {country.name.common}
        <button onClick={() => handleClick(country.name.common)}>Show</button>
      </div>
    ))
  }

  // Mostrar el país seleccionado si hay uno
  const selectedCountryContent = selectedCountry && (
    <div>
      <h3>{selectedCountry.name.common}</h3>
      <p>Capital: {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <h4>Languages</h4>
      {Object.values(selectedCountry.languages).map((language, index) => (
        <div key={index}>{language}</div>
      ))}
      <br />
      <img src={selectedCountry.flags.png} alt="Flag"></img>
      {weather && (
        <div>
          <h4>Weather in {selectedCountry.capital}</h4>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <hr />
      <h3>Filtered Countries</h3>
      {selectedCountry ? selectedCountryContent : filteredContent}
      <hr />
    </div>
  )
}

export default Country
