import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests"

const App = () => {
  const queryClient = useQueryClient()
  // const newAnecdoteMutation = useMutation({
  //   mutationFn: createAnecdote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
  //   },
  // })
  // const addAnecdote = async (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ""
  //   newAnecdoteMutation.mutate({ content, important: true })
  // }
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
  })

  const handleVote = (anecdote) => {
    console.log("vote")
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
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

      <Notification />
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
