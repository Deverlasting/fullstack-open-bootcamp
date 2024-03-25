import { useState } from "react"

const MostVotesAnecdote = ({ points, anecdotes }) => {
  let maxScore = null
  let maxScorePosition = null

  for (let i = 0; i < points.length; i++) {
    if (points[i] > maxScore) {
      // Si encontramos un valor mayor que el actual máximo
      maxScore = points[i] // Actualizamos el máximo
      maxScorePosition = i // Actualizamos la posición del máximo
    }
  }
  if (maxScorePosition === null) return "There are no votes yet :("

  return anecdotes[maxScorePosition]
}

const App = () => {
  const anecdotes = [
    "0If it hurts, do it more often.",
    "1Adding manpower to a late software project makes it later!",
    "2The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "3Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "4Premature optimization is the root of all evil.",
    "5Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "6Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "7The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(8).fill(0))

  const randomAnecdote = () => {
    const newRandomIndex = Math.floor(Math.random() * anecdotes.length)

    setSelected(newRandomIndex)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <button onClick={randomAnecdote}>Random anecdote</button>
      <br />
      <button onClick={vote}>Vote</button>
      <br />
      Votes: {points[selected]}
      <h1> Anecdote with most votes!</h1>
      <MostVotesAnecdote points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App
