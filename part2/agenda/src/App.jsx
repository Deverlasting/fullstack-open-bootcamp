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
  const [typeMessage, setTypeMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (newName === "") return window.alert("Name field is empty")
    if (newNumber === "") return window.alert("Number field is empty")

    let alreadyAdded = false
    personsServices
      .getAll()
      .then((response) => {
        const personAlreadyAdded = response.data.map((obj) => {
          console.log(response.status)
          if (obj.name === newName) {
            alreadyAdded = true

            if (window.confirm(`Do you really want to update ${obj.name} number to ${newNumber}?`)) {
              // throw new Error("Mensaje de error")
              console.log(response.status)
              // if (response.status === 404) {
              //   throw new Error("Error 404")
              // }
              setTypeMessage("correct")
              setNotificationMessage(`${newPerson.name} modified correctly`)
              personsServices.update(obj.id, newPerson)
            }
            console.log(response.status)
            // if (response.status === 404) {
            //   throw new Error("Error 404")
            // }
            // return
          }
        })
        console.log(response.status)

        if (!alreadyAdded) {
          setTypeMessage("correct")
          setNotificationMessage(`${newPerson.name} added correctly`)
          personsServices.create(newPerson).then(() => {})
          // personsServices.create(newPerson).then((response) => {})
        }
        console.log(response.status)
      })
      .catch((error) => {
        // alert(`the note was already deleted from server`)
        console.log("error", error)
        setTypeMessage("error")
        setNotificationMessage(`Error updating ${newPerson.name} data`)
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
