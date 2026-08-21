import { createContext } from "react"
import { useAnecdotes } from "./hooks/useAnecdotes"

const AnecdoteContext = createContext()

export default AnecdoteContext

export const AnecdoteContextProvider = (props) => {
  const { anecdotes, addAnecdote, deleteAnecdote } = useAnecdotes()
  return (
    <AnecdoteContext.Provider
      value={{ anecdotes, addAnecdote, deleteAnecdote }}
    >
      {props.children}
    </AnecdoteContext.Provider>
  )
}
