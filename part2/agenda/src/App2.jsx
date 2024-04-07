// import { useState, } from "react"
// import List from "./components/List"
// import FilteredPersons from "./components/FilteredPersons"
// import { Form } from "./components/Form"
// import personsServices from "./services/personsServices"
// import Filter from "./components/Filter"
// import Notification from "./components/Notification"

// const App = () => {
//   const [newName, setNewName] = useState("") //form input
//   const [newNumber, setNewNumber] = useState("")
//   const [filterText, setFilterText] = useState("")
//   const [notificationMessage, setNotificationMessage] = useState("")
//   const [typeMessage, setTypeMessage] = useState()

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     console.log("0", typeMessage)
//     const newPerson = {
//       name: newName,
//       number: newNumber,
//     }

//     if (newName === "") return window.alert("Name field is empty")
//     if (newNumber === "") return window.alert("Number field is empty")

//     // let alreadyAdded = false
//     personsServices
//       .getAll()
//       .then((response) => {
//         let alreadyAdded = false

//         const personAlreadyAdded = response.data.map((obj) => {
//           // console.log(response.status)
//           if (obj.name === newName) {
//             alreadyAdded = true
//             console.log("1", typeMessage)
//             if (window.confirm(`Do you really want to update ${obj.name} number to ${newNumber}?`)) {
//               // console.log(response.status)
//               try {
//                 console.log("2", typeMessage)
//                 setTypeMessage("correct")
//                 setNotificationMessage(`${newPerson.name} modified correctly`)
//                 personsServices.update(obj.id, newPerson)
//                 console.log("2.2", typeMessage)
//               } catch (error) {
//                 console.log("error", error)
//                 console.log("3", typeMessage)
//                 setTypeMessage("error")
//               }
//             }
//           }
//         })
//         console.log("4", typeMessage)

//         if (alreadyAdded === false) {
//           setTypeMessage("correct")
//           setNotificationMessage(`${newPerson.name} added correctly`)
//           personsServices.create(newPerson).then(() => {})
//           // personsServices.create(newPerson).then((response) => {})
//         }
//       })
//       .catch((error) => {
//         // alert(`the note was already deleted from server`)
//         // console.log("error", error)
//         setTypeMessage("error")
//         setNotificationMessage(`Error updating ${newPerson.name} data`)
//       })
//     console.log("5", typeMessage)
//     setTimeout(() => {
//       setTypeMessage(null)
//       setNotificationMessage(null)
//     }, 10000)
//   }

//   const handleChangeName = (event) => {
//     setNewName(event.target.value)
//   }

//   const handleChangeNumber = (event) => {
//     setNewNumber(event.target.value)
//   }

//   const handleChangeFilterText = (event) => {
//     setFilterText(event.target.value)
//   }

//   return (
//     <div>
//       <h1>PhoneBook</h1>
//       <Notification notificationMessage={notificationMessage} typeMessage={typeMessage} />
//       <Filter filterText={filterText} handleChangeFilterText={handleChangeFilterText} />

//       <Form
//         handleSubmit={handleSubmit}
//         newName={newName}
//         newNumber={newNumber}
//         handleChangeName={handleChangeName}
//         handleChangeNumber={handleChangeNumber}
//       />

//       <List />
//       <FilteredPersons filterText={filterText} />
//     </div>
//   )
// }

// export default App

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

  useEffect(() => {
    personsServices.getAll().then((response) => {
      setPersons(response.data)
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
            // Actualizar la lista de personas después de agregar una nueva
            const updatedPersonsResponse = await personsServices.getAll()
            setPersons(updatedPersonsResponse.data)
          }
          break
        }
      }

      if (!alreadyAdded) {
        setTypeMessage("correct")
        setNotificationMessage(`${newPerson.name} added correctly`)
        await personsServices.create(newPerson)
        // Actualizar la lista de personas después de agregar una nueva
        const updatedPersonsResponse = await personsServices.getAll()
        setPersons(updatedPersonsResponse.data)
      }
    } catch (error) {
      console.log("catch", error)
      // console.log("catch", error.response.data.error)
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

  const handleClick = (event) => {
    const id = event.target.id

    if (window.confirm(`Do you really want to delete ${event.target.name}?`)) {
      personsServices.deletePerson(id).then(() => {
        //used to reload the web automatically
        personsServices.getAll().then((response) => {
          setPersons(response.data)
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
