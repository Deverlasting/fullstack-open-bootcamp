// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { getAnecdotes, createAnecdote } from "../../requests"

// const AnecdoteForm = () => {
//   //   const onCreate = (event) => {
//   //     event.preventDefault()
//   //     const content = event.target.anecdote.value
//   //     event.target.anecdote.value = ''
//   //     console.log('new anecdote')
//   // }

//   const queryClient = useQueryClient()
//   const newAnecdoteMutation = useMutation({
//     mutationFn: createAnecdote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
//     },
//   })
//   const onCreate = async (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     event.target.anecdote.value = ""
//     newAnecdoteMutation.mutate({ content, votes: 0 })
//   }

//   return (
//     <div>
//       <h3>create new</h3>
//       <form onSubmit={onCreate}>
//         <input name="anecdote" />
//         <button type="submit">create</button>
//       </form>
//     </div>
//   )
// }

// export default AnecdoteForm

import { useContext, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, createAnecdote } from "../../requests"
import { NotificationContext } from "../NotificationContext"

const AnecdoteForm = () => {
  const { state, dispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: (error) => {
      dispatch({ type: "SHOW_NOTIFICATION", message: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "SHOW_NOTIFICATION", message: `${content} created` })
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
