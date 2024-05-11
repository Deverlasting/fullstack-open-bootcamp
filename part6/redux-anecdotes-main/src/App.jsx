import { useSelector, useDispatch } from "react-redux"
import { createAnecdote } from "./reducers/anecdoteReducer"

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log("vote", id)
    dispatch({ type: "VOTE", payload: id })
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(content))
  }

  const sortByVotes = (a, b) => {
    return b.likes - a.likes // Orden descendente
  }

  const sortedAnecdotes = [...anecdotes].sort(sortByVotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* {anecdotes.map((anecdote) => ( */}
      {/* {anecdotes.sort(sortByVotes).map((anecdote) => ( */}
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        {/* <button type={"submit"} onClick={() => newAnecdote()}>create</button> */}
        <button type={"submit"}>create</button>
      </form>
    </div>
  )
}

export default App
