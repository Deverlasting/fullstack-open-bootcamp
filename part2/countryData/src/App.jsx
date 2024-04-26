import { useState } from "react"
import "./App.css"
import AllCountries from "./components/AllCountries"
import Country from "./components/Country"

function App() {
  const [filteredTextCountry, setFilteredTextCountry] = useState("")

  const handleFilterCountry = (event) => {
    setFilteredTextCountry(event.target.value)
  }

  return (
    <>
      Find countries
      <input onChange={handleFilterCountry}></input>
      {filteredTextCountry}
      <br />
      {/* <AllCountries /> */}
      <Country filteredTextCountry={filteredTextCountry} handleFilterCountry={handleFilterCountry} />
    </>
  )
}

export default App
