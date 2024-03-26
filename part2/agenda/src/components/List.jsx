export const List = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name}: {person.number}
        </div>
      ))}
    </div>
  )
}

export default List
