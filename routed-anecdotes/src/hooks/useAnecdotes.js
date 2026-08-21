import { useState, useEffect } from "react"
import anecdoteService from "../services/anecdotes"

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(setAnecdotes)
  }, [])

  const addAnecdote = async (content) => {
    const res = await anecdoteService.createNew(content)
    setAnecdotes([...anecdotes, res])
    return res
  }

  const deleteAnecdote = async (id) => {
    const res = await anecdoteService.remove(id)
    setAnecdotes(() => anecdotes.filter((a) => a.id !== id))
    return res
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}
