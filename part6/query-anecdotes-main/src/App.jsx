import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests"
import { useContext } from "react"
import { NotificationContext } from "./NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const { state, dispatch } = useContext(NotificationContext)
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log("vote")
    // dispatch({ type: "SHOW_NOTIFICATION", message: "Anecdote voted" })
    dispatch({ type: "SHOW_NOTIFICATION", message: `${anecdote.content} voted` })
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server </div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={state.message} isVisible={state.isVisible} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
