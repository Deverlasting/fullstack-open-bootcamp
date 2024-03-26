import { useState } from "react"
import List from "./components/List"
import FilteredPersons from "./components/FilteredPersons"
import Filter from "./components/Filter"
import { Form } from "./components/Form"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("") //form input
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    let alreadyAdded = false
    const personAlreadyAdded = persons.map((obj) => {
      if (obj.name === newName) {
        alreadyAdded = true
        return window.alert(`${newName} is already added to the phonebook`)
      }
    })
    if (alreadyAdded) return

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilterText = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h1>PhoneBook</h1>
      <Filter filterText={filterText} handleChangeFilterText={handleChangeFilterText} />

      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <List persons={persons} />
      <FilteredPersons persons={persons} filterText={filterText} />
    </div>
  )
}

export default App
