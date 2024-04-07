import { useState, useEffect } from "react"
import List from "./components/List"
import FilteredPersons from "./components/FilteredPersons"
import { Form } from "./components/Form"
import personsServices from "./services/personsServices"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const [newName, setNewName] = useState("") //form input
  const [newNumber, setNewNumber] = useState("")
  const [filterText, setFilterText] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [typeMessage, setTypeMessage] = useState()
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // if (newName === "") return window.alert("Name field is empty")
    // if (newNumber === "") return window.alert("Number field is empty")

    let person = persons.find((p) => p.name === newName) //busca una persona que esté en la BD que coincida con la introducida
    let changedPerson = { ...person, number: newNumber } //persona modificada con el número cambiado

    // if (window.confirm(`Do you really want to update ${changedPerson.name} number to ${newNumber}?`)) {
    if (person && window.confirm(`Do you really want to update ${changedPerson.name} number to ${newNumber}?`)) {
      personsServices
        .update(changedPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((p) => (p.id !== changedPerson.id ? p : returnedPerson)))
          setTypeMessage("correct")
          setNotificationMessage(`${newPerson.name} modified correctly`)
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== changedPerson.id))
          setNotificationMessage(`${error.response.data.error}`)
          setTypeMessage("error")
        })
    } else {
      // setTypeMessage("correct")
      // setNotificationMessage(`${newPerson.name} added correctly`)
      await personsServices
        .create(newPerson)
        .then((createPerson) => {
          setTypeMessage("correct")
          setNotificationMessage(`${newPerson.name} added correctly`)
        })
        .catch((error) => {
          setTypeMessage("error")
          setNotificationMessage(`${error.response.data.error}`)
        })
    }

    // if (!alreadyAdded) {
    //   setTypeMessage("correct")
    //   setNotificationMessage(`${newPerson.name} added correctly`)
    //   await personsServices.create(newPerson)
    // }

    // Actualizar la lista de personas después de agregar una nueva, no es lo más optimo (creo)
    personsServices.getAll().then((initialPerson) => {
      setPersons(initialPerson)
    })

    setTimeout(() => {
      setTypeMessage(null)
      setNotificationMessage(null)
    }, 10000)
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

  const handleClick = (event) => {
    const id = event.target.id

    if (window.confirm(`Do you really want to delete ${event.target.name}?`)) {
      personsServices.deletePerson(id).then(() => {
        personsServices.getAll().then((initialPerson) => {
          setPersons(initialPerson)
        })
      })
    }
  }

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification notificationMessage={notificationMessage} typeMessage={typeMessage} />

      <Filter filterText={filterText} handleChangeFilterText={handleChangeFilterText} />

      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <List persons={persons} handleClick={handleClick} />
      <FilteredPersons filterText={filterText} />
    </div>
  )
}

export default App
