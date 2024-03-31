import { useState, useEffect } from "react"
import personsServices from "../services/personsServices"

export const List = () => {
  const [persons, setPersons] = useState([])

  personsServices.getAll().then((response) => {
    setPersons(response.data)
  })

  const handleClick = (event) => {
    const id = event.target.id

    if (window.confirm(`Do you really want to delete ${event.target.name}?`)) {
      personsServices.deletePerson(id)
    }
  }

  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name}: {person.number}
          <button onClick={handleClick} id={person.id} name={person.name}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default List
