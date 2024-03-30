import countriesServices from "../services/countriesServices"

export const AllCountries = () => {
  countriesServices
    .getAll()
    .then((response) => {
      const countries = response.data

      // Mapea el array de países para imprimir el nombre de cada uno
      countries.forEach((country) => {
        console.log(country.name.official)
        // return <div>name: {country.name.official}</div>
        return <h1>a</h1>
      })
      console.log(response.data)
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
}

export default AllCountries
