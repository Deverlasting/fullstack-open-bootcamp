import { useState } from "react"
import "./App.css"
import AllCountries from "./components/AllCountries"
import Country from "./components/Country"

function App() {
  const [country, setCountry] = useState()

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <>
      Find countries
      <input onChange={handleChange}></input>
      {country}
      <br />
      {/* <AllCountries /> */}
      <Country />
    </>
  )
}

export default App
