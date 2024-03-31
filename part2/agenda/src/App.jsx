import { useState } from "react"
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (newName === "") return window.alert("Name field is empty")
    if (newNumber === "") return window.alert("Number field is empty")

    try {
      const response = await personsServices.getAll()

      let alreadyAdded = false
      for (const obj of response.data) {
        if (obj.name === newName) {
          alreadyAdded = true
          if (window.confirm(`Do you really want to update ${obj.name} number to ${newNumber}?`)) {
            setTypeMessage("correct")
            setNotificationMessage(`${newPerson.name} modified correctly`)
            await personsServices.update(obj.id, newPerson)
          }
          break
        }
      }

      if (!alreadyAdded) {
        setTypeMessage("correct")
        setNotificationMessage(`${newPerson.name} added correctly`)
        await personsServices.create(newPerson)
      }
    } catch (error) {
      setTypeMessage("error")
      setNotificationMessage(`Error updating ${newPerson.name} data`)
    }

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

      <List />
      <FilteredPersons filterText={filterText} />
    </div>
  )
}

export default App
