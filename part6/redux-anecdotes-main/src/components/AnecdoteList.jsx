import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  // const anecdotes = useSelector((state) => state.anecdotes)
  const anecdotes = useSelector((store) => store.anecdotes)
  // const filter = useSelector((state) => state.filter)
  const filter = useSelector((store) => store.filter)
  const dispatch = useDispatch()

  const sortByVotes = (a, b) => b.votes - a.votes

  // const vote = (id) => {
  //   dispatch(voteAnecdote(id))
  // }

  const vote = (id, content) => {
    // dispatch(voteAnecdote(id))
    dispatch(voteForAnecdote(id))
    dispatch(setNotification(`You voted: '${content}'`, 5))
    // setTimeout(() => {
    //   dispatch(clearNotification())
    // }, 10000)

    // dispatch(setNotification(`You voted: '${content}'`))
    // setTimeout(() => {
    //   dispatch(clearNotification())
    // }, 5000)
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) => anecdote?.content?.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = [...filteredAnecdotes].sort(sortByVotes)
  // console.log(anecdotes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
