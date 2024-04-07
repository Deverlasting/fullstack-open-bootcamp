export const List = ({ persons, handleClick }) => {
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
