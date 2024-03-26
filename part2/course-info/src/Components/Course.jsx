export const Course = ({ courses }) => (
  <div>
    <h1>Web development curriculum</h1>
    {courses.map((course) => {
      const { name, id, parts } = course
      const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)

      return (
        <div key={id}>
          <h2>{name}</h2>
          <ul>
            {parts.map(({ name: partName, exercises, id: partId }) => (
              <li key={partId}>
                {partName}: {exercises}
              </li>
            ))}
          </ul>
          <p>Total exercises: {totalExercises}</p>
        </div>
      )
    })}
  </div>
)

export default Course
