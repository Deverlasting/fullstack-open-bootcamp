import personsServices from "../services/personsServices"
import { useState, useEffect } from "react"

export const FilteredPersons = ({ filterText }) => {
  const [persons, setPersons] = useState([])

  // useEffect(() => {
  //   personsServices.getAll().then((response) => {
  //     setPersons(response.data)
  //   })
  // }, [])

  useEffect(() => {
    personsServices.getAll().then((initialPerson) => {
      setPersons(initialPerson)
    })
  }, [])

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterText.toLowerCase()))
  return (
    <div>
      <h3>Filtered persons</h3>
      {filteredPersons.map((person, index) => (
        <div key={index}>
          {person.name} - {person.number}
        </div>
      ))}
    </div>
  )
}

export default FilteredPersons
